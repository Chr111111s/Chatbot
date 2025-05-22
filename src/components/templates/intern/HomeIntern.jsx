import { useState, useEffect, useRef } from 'react';
import AsideBarInter from '../../ui/AsideBarIntern';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

const HomeIntern = () => {
  const [messages, setMessages] = useState([]);
  const [isAsideExpanded, setIsAsideExpanded] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0) {
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      });
    }
  }, [messages]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    const newUserMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, newUserMessage]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content:
            'Hola, ¿cómo estás? Esto es una prueba para ver el contenedor y su comportamiento al añadir mucho texto. El objetivo es que el input permanezca fijo en la parte inferior mientras los mensajes se desplazan. Este es un texto de ejemplo largo para verificar que el scroll funcione correctamente y que el diseño se mantenga estable. Espero que esta demostración te sea útil para tu interfaz de chat.',
        },
      ]);
    }, 500);
  };

  const handleAsideToggle = (expanded) => {
    setIsAsideExpanded(expanded);
  };

  return (
    <div className='flex min-h-screen w-full bg-greyPrimary'>
      <aside className='h-screen sticky top-0 z-20 '>
        <AsideBarInter />
      </aside>

      <main
        className={`flex flex-col flex-1 bg-greyPrimary transition-all duration-300 ease-in-out ${
          isAsideExpanded ? 'ml-[16em]' : 'ml-[4em]'
        } overflow-hidden h-screen relative`}
      >
        <div
          className={`flex-1 flex flex-col overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 ${
            messages.length === 0
              ? 'items-center justify-center'
              : 'items-center justify-start'
          }`}
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center text-center w-full max-w-2xl">
              <h1 className='text-2xl md:text-3xl font-semibold text-gray-700 mb-8'>
                ¿En qué te puedo ayudar hoy?
              </h1>
              <div className="w-full px-2">
                <ChatInput onSend={handleSend} />
              </div>
            </div>
          ) : (
            <div className='w-full max-w-2xl space-y-4 pb-4 mt-10'>
              {messages.map((msg, i) => (
                <ChatMessage key={i} role={msg.role} content={msg.content} />
              ))}
              <div ref={messagesEndRef} className="h-0" />
            </div>
          )}
        </div>

        {messages.length > 0 && (
          <div className='p-4 bg-greyPrimary sticky bottom-4 w-full z-10 border-gray-200'>
            <ChatInput onSend={handleSend} />
          </div>
        )}
      </main>
    </div>
  );
};

export default HomeIntern;