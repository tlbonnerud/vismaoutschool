const endpoint = process.env.NEXT_PUBLIC_AZURE_ENDPOINT;
const apiKey = process.env.NEXT_PUBLIC_AZURE_API_KEY;
const agentId = process.env.NEXT_PUBLIC_AGENT_ID;

export async function queryAgent(userMessage: string) {
   try {
      if (!endpoint || !apiKey || !agentId) {
         throw new Error('Missing required environment variables');
      }

      // Azure AI Foundry uses a different URL structure
      // The endpoint already includes the full path
      const apiVersion = "2024-07-01-preview";

      console.log('Using endpoint:', endpoint);

      // Create thread - use the endpoint directly
      const threadResponse = await fetch(
         `${endpoint}/agents/threads? api-version=${apiVersion}`,
         {
            method: 'POST',
            headers: {
               'api-key': apiKey,
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
         }
      );

      if (!threadResponse.ok) {
         const errorText = await threadResponse.text();
         console.error('Thread creation failed:', errorText);
         throw new Error(`Failed to create thread: ${errorText}`);
      }

      const thread = await threadResponse.json();
      const threadId = thread.id;
      console.log('Thread created:', threadId);

      // Add message
      const messageResponse = await fetch(
         `${endpoint}/agents/threads/${threadId}/messages? api-version=${apiVersion}`,
         {
            method: 'POST',
            headers: {
               'api-key': apiKey,
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               role: "user",
               content: userMessage
            })
         }
      );

      if (!messageResponse.ok) {
         const errorText = await messageResponse.text();
         console.error('Message creation failed:', errorText);
         throw new Error(`Failed to create message: ${errorText}`);
      }

      console.log('Message added');

      // Create run
      const runResponse = await fetch(
         `${endpoint}/agents/threads/${threadId}/runs?api-version=${apiVersion}`,
         {
            method: 'POST',
            headers: {
               'api-key': apiKey,
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               assistant_id: agentId
            })
         }
      );

      if (!runResponse.ok) {
         const errorText = await runResponse.text();
         console.error('Run creation failed:', errorText);
         throw new Error(`Failed to create run: ${errorText}`);
      }

      const run = await runResponse.json();
      let runStatus = run.status;
      let runId = run.id;
      console.log('Run created:', runId, 'Status:', runStatus);

      // Poll for completion
      while (runStatus === "queued" || runStatus === "in_progress") {
         await new Promise(resolve => setTimeout(resolve, 1000));

         const statusResponse = await fetch(
            `${endpoint}/agents/threads/${threadId}/runs/${runId}?api-version=${apiVersion}`,
            {
               headers: {
                  'api-key': apiKey
               }
            }
         );

         if (!statusResponse.ok) {
            const errorText = await statusResponse.text();
            console.error('Status check failed:', errorText);
            throw new Error(`Failed to get run status: ${errorText}`);
         }

         const statusData = await statusResponse.json();
         runStatus = statusData.status;
         console.log('Run status:', runStatus);

         if (runStatus === "failed") {
            throw new Error(`Run failed: ${statusData.last_error?.message}`);
         }
      }

      // Get messages
      const messagesResponse = await fetch(
         `${endpoint}/agents/threads/${threadId}/messages?api-version=${apiVersion}`,
         {
            headers: {
               'api-key': apiKey
            }
         }
      );

      if (!messagesResponse.ok) {
         const errorText = await messagesResponse.text();
         console.error('Get messages failed:', errorText);
         throw new Error(`Failed to get messages: ${errorText}`);
      }

      const messagesData = await messagesResponse.json();
      const assistantMessage = messagesData.data
         .filter((msg: any) => msg.role === "assistant")[0];

      return assistantMessage?.content[0]?.text?.value || "No response";
   } catch (error) {
      console.error("Error querying agent:", error);
      throw error;
   }
}
