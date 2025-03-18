"use client";
import { useEffect, useRef, useState } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { Socket } from "socket.io-client";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import axios from "axios";
import { useAuthContext } from "@/context";

import { SquareArrowOutUpRight } from 'lucide-react';


// Default values shown


interface MonacoEditorProps {
    socket: Socket | null;
    roomId: string;
    username: string;
    role: "OWNER" | "EDITOR" | "VIEWER" | undefined;
}

const CodeEditor: React.FC<MonacoEditorProps> = ({ socket, roomId, username, role }) => {
    const { token } = useAuthContext()
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const [code, setCode] = useState<string>("");
    const [language, setLanguage] = useState<string>("javascript");
    const [error, setError] = useState<string>("");
    const [output, setOutput] = useState<string>("");
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const isUpdatingRef = useRef(false);

    // Handle real-time code updates
    useEffect(() => {
        socket?.on("code_updated", ({ code: newCode }: { code: string }) => {
            const editor = editorRef.current;
            if (!editor) return;

            if (editor.getValue() === newCode) return;
            const temp = code

            setCode((prevCode) => {
                return newCode;
            });

            const position = editor.getPosition();
            const selection = editor.getSelection();

            isUpdatingRef.current = true;
            editor.executeEdits("", [
                {
                    range: editor.getModel()?.getFullModelRange()!,
                    text: newCode,
                    forceMoveMarkers: true,
                },
            ]);

            if (position) editor.setPosition(position);
            if (selection) editor.setSelection(selection);

            isUpdatingRef.current = false;
        });
        const handleLanguageChange = ({ language: newLanguage }: { language: string }) => {
            console.log("Language changed:", newLanguage);
            setLanguage(newLanguage);
        };

        socket?.on("language_changed", handleLanguageChange);
        socket?.on("output_changed", ({ output: newOutput, error: newError }: { output: string, error: string }) => {

            setOutput(newOutput);
            setError(newError);
        })
        return () => {
            socket?.off("code_updated");
            socket?.off("language_updated");
            socket?.off("output_updated");
        };
    }, [socket]);

    // Emit code change to socket
    const handleEditorChange = (value: string | undefined) => {
        if (!value || value === code || isUpdatingRef.current || role === "VIEWER") return;

        if (role === "OWNER" || role === "EDITOR") {
            setCode(value);
            socket?.emit("code_update", { roomId, code: value });
        }
    };


    const handleEditorDidMount: OnMount = (editor) => {
        editorRef.current = editor;

    };

    const runCode = async () => {
        setIsRunning(true);
        axios.post(`${process.env.NEXT_PUBLIC_EXECUTION_SERVER_URL}/execute`, {
            code: code,
            language: language
        }).then((response) => {
            setError("");
            console.log(response);

            if (response.data.error !== "") {
                setError(response.data.error);
                setOutput(""); // Reset output if there's an error
                socket?.emit("output_change", { roomId, output: "", error: response.data.error });
            } else {
                setOutput(response.data.output);
                setError(""); // Reset error if output is valid
                socket?.emit("output_change", { roomId, output: response.data.output, error: "" });
            }
            setIsRunning(false);
        }).catch((error) => {
            console.error("Error executing code:", error);
            setIsRunning(false);
        });
    };

    const changeLanguage = () => {
        if (role === "VIEWER") return
        return (value: string) => {
            setLanguage(value);
            socket?.emit("language_change", { roomId, language: value });
        };
    }

    useEffect(() => {
        console.log("Token in CodeEditor:", token); // Debugging token availability
        if (!token) return; // Prevent API call if token is empty

        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${roomId}/code`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log("Response pp", response.data);
                setCode(response.data[0].code);
            })
            .catch((error) => {
                console.error("Error fetching code:", error);
            });
    }, [token]);

    return (
        <div className="flex flex-col space-y-4 p-4 h-screen ">
            <div className="flex items-center space-x-5">
                <Select value={language} onValueChange={changeLanguage()} disabled={role === "VIEWER"}>
                    <SelectTrigger className="w-[140px] bg-gray-800 text-white">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white">
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                    </SelectContent>
                </Select>
                {
                    role !== "VIEWER" &&
                    <div>
                        {
                            isRunning ? <div className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">     <div className="w-5 h-5 border-8 border-dashed rounded-full animate-spin border-white "></div></div> : <Button onClick={runCode} className=" text-white px-4 py-2 rounded">
                                Run
                            </Button>
                        }

                    </div>
                }
                {/* <Button  className=" "> */}
                    <SquareArrowOutUpRight/>
                {/* </Button> */}
            </div>
            <div className="flex flex-col flex-grow h-full space-y-4">
                <ResizableBox
                    width={900}
                    height={400}
                    minConstraints={[300, 200]}
                    maxConstraints={[1000, 500]}
                    resizeHandles={["s", "e", "se"]}
                    className="border border-gray-700 rounded bg-[#1e1e1e] relative"
                >
                    <Editor
                        width="100%"
                        height="100%"
                        theme="vs-dark"
                        language={language}
                        value={code}
                        onChange={role === "VIEWER" ? undefined : handleEditorChange}
                        onMount={handleEditorDidMount}
                        options={{
                            readOnly: role === "VIEWER"
                        }}
                    />
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-600 cursor-row-resize"></div>
                </ResizableBox>

                <div className="border border-gray-700 rounded bg-gray-900 h-auto text-white p-3 relative flex-1 min-h-0">
                    <h3 className="text-lg font-semibold">Output</h3>
                    <pre className="whitespace-pre-wrap text-sm">{error.length > 0 ? error : output}</pre>
                </div>
            </div>
        </div>

    );
};

export default CodeEditor;
