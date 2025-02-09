"use client"

import { useState } from "react"
import { Bot, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }])
      setInput("")
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I'm a demo AI assistant. I can't actually process your request, but I'm here to show how an AI integration might look in this dashboard!",
          },
        ])
      }, 1000)
    }
  }

  return (
    <div className="border rounded-lg p-4 h-[400px] flex flex-col">
      <div className="flex items-center mb-4">
        <Bot className="mr-2" />
        <h3 className="text-lg font-semibold">AI Assistant</h3>
      </div>
      <ScrollArea className="flex-grow mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
            } max-w-[80%]`}
          >
            {message.content}
          </div>
        ))}
      </ScrollArea>
      <div className="flex">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend} className="ml-2">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

