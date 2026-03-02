"use client";

import { useState } from "react";
import { Search, Send, Paperclip, Smile, Phone, MoreHorizontal, Plus, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function WhatsAppPage() {
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState("");

    return (
        <div className="flex h-[calc(100vh-7rem)] rounded-xl border bg-card overflow-hidden">
            {/* Contact list */}
            <div className="w-80 flex flex-col border-r">
                <div className="p-3 border-b space-y-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold">Chats</h2>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Buscar chats..."
                            className="h-8 pl-9 text-xs"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <ScrollArea className="flex-1">
                    <div className="flex flex-col items-center justify-center h-64 text-muted-foreground p-4 text-center">
                        <MessageCircle className="h-10 w-10 mb-3 text-muted-foreground/40" />
                        <p className="text-xs font-medium">Sin conversaciones</p>
                        <p className="text-[10px] mt-1">Conecta tu WhatsApp escaneando el QR desde la configuración</p>
                    </div>
                </ScrollArea>
            </div>

            {/* Chat area */}
            <div className="flex flex-1 flex-col">
                {/* Chat header */}
                <div className="flex items-center justify-between border-b p-3">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <MessageCircle className="h-4 w-4 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">WhatsApp</p>
                            <p className="text-[10px] text-muted-foreground">Selecciona un chat para comenzar</p>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Messages area */}
                <div className="flex-1 flex items-center justify-center bg-muted/20">
                    <div className="text-center space-y-3 p-8">
                        <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <MessageCircle className="h-8 w-8 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Nexo WhatsApp</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Envía y recibe mensajes de WhatsApp directamente desde tu CRM.
                                <br />
                                Conecta tu número escaneando el código QR.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Message input */}
                <div className="border-t p-3">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                            <Paperclip className="h-4 w-4" />
                        </Button>
                        <Input
                            placeholder="Escribe un mensaje..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="flex-1"
                        />
                        <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                            <Smile className="h-4 w-4" />
                        </Button>
                        <Button size="icon" className="h-9 w-9 shrink-0 bg-emerald-500 hover:bg-emerald-600" disabled={!message.trim()}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
