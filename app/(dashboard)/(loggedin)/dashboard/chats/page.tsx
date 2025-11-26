// chat site
'use client';

import AIChat from '@/app/components/chatpage/AIChat';

export default function ChatPage() {
   {/* make the component take the full screen and stay as on the background of the page */ }
   return (
      <div className="min-h-screen min-w-screen static z-0 ">
         <AIChat />
      </div>
   );
};

