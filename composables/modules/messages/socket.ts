import { ref, onMounted, onUnmounted } from "vue";
import { io, Socket } from "socket.io-client";
import { useUser } from "@/composables/auth/user";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { useGetUserGroups } from "@/composables/modules/group/useGetUserGroups";
import { useGetGroupMessages } from "@/composables/modules/messages/useGetGroupMessages";
const route = useRoute();

export const useWebSocket = () => {
  const { showToast } = useCustomToast();
  const { userGroupsList, fetchUserGroups } = useGetUserGroups();
  const { messages: initialMessages, fetchGroupMessages,  } = useGetGroupMessages();
  
  const { token, user } = useUser();
  const allMessages = ref<any[]>([]);
  const isConnected = ref(false);
  const socket = ref<Socket | null>(null);

  // Initialize the WebSocket connection
  const initializeSocket = async () => {
    console.log("Initializing WebSocket connection...");
    socket.value = io("https://compassa-edu-backend.onrender.com/", {
      query: {
        userId: user.value._id,
        token: token.value,
      },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Connection events
    socket.value.on("connect", async () => {
      console.log("WebSocket connected");
      showToast({
        title: "Success",
        message: "WebSocket connection established!",
        toastType: "success",
        duration: 3000,
      });
      isConnected.value = true;
      await fetchUserGroups().then((data) => {
        Array.isArray(data) && data.forEach((group: any) => {
          console.log(`Joining group ${group._id}`);
          socket.value?.emit("joinGroup", group._id, (response: any) => {
            console.log(`Join group response for group ${group._id}:`, response);
          });
        });

        allMessages.value = [...initialMessages.value];
      }).catch((error: any) => {
        console.error("Error fetching user groups or joining groups:", error);
      })
    });

    socket.value.on("disconnect", () => {
      console.log("WebSocket disconnected");
      showToast({
        title: "Disconnected",
        message: "WebSocket connection lost.",
        toastType: "error",
        duration: 3000,
      });
      isConnected.value = false;
    });

    // socket.value.on("error", (error) => {
    //   console.error("WebSocket error:", error);
    //   showToast({
    //     title: "Error",
    //     message: `WebSocket error: ${error}`,
    //     toastType: "error",
    //     duration: 3000,
    //   });
    //   isConnected.value = false;
    // });

    // Handle group update event
    socket.value.on("group.update", (data) => {
      console.log("Received group.update event:", data);
      fetchUserGroups();
    });

    // Handle new messages
    socket.value.on("message.new", (message: any) => {
      console.log("Received new message:", message);
      // const messageDate = moment(message.timestamp);
      // Transform the incoming message to match the standard pattern
      const formattedMessage = {
        _id: String(message.id), // Ensure ID is always a string
        group: String(message.groupId), // Ensure group ID is a string
        content: message.content,
        sender: {
          _id: String(message.senderId), // Ensure sender ID is a string
        },
        attachments: [],
        type: message.type,
        readBy: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        // createdAt: message.timestamp,
        // updatedAt: message.timestamp,
        __v: 0,
      };
    
      // Strictly check the last three messages for duplicates using content
      const lastMessages = allMessages.value.slice(-3); // Get the last 3 messages
      const isDuplicate = lastMessages.some((msg) => msg.content === formattedMessage.content);
    
      if (!isDuplicate) {
        allMessages.value = [...allMessages.value, formattedMessage]; // Add the new message
      } else {
        console.warn("Duplicate message detected based on content:", formattedMessage);
      }
    
      console.log(allMessages.value, "All messages here");
    });
    

    socket.value.on("joined-group", (message: any) => {
      console.log("Successfully joined group:", message);
    });

    socket.value.on('message-sent', (data) => {
      console.log(data, 'message sent success');
    });

        // Listen for new messages broadcasted to the group
    socket.value.on("receive-message", (message) => {
      console.log(message, 'message recieved')
      if(user.value.id === message.senderId){
        showToast({
          title: "Receive notifications",
          message: "You have a new message.",
          toastType: "success",
          duration: 3000,
        });
      }
      const formattedMessage = {
        _id: String(message.id), // Ensure ID is always a string
        group: String(message.groupId), // Ensure group ID is a string
        content: message.content,
        sender: {
          _id: String(message.senderId), // Ensure sender ID is a string
        },
        attachments: [],
        type: message.type,
        readBy: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        // createdAt: message.timestamp,
        // updatedAt: message.timestamp,
        __v: 0,
      };
    
      // Strictly check the last three messages for duplicates using content
      const lastMessages = allMessages.value.slice(-3); // Get the last 3 messages
      const isDuplicate = lastMessages.some((msg) => msg.content === formattedMessage.content);
    
      if (!isDuplicate) {
        allMessages.value = [...allMessages.value, formattedMessage]; // Add the new message
      } else {
        console.warn("Duplicate message detected based on content:", formattedMessage);
      }
      // console.log("Received new group message:", message);
      // allMessages.value = [...allMessages.value, message];
    });

    // Handle messages update
    socket.value.on("messages.update", (updatedMessages: any[]) => {
      console.log("Messages updated:", updatedMessages);
      allMessages.value = updatedMessages.map((msg) => ({
        ...msg,
        status: "received",
      }));
    });
  };

  const sendMessage = async (content: string, groupId: string | any) => {
    const payloadObj = {
      groupId: route.query.group,
      content,
      senderId: user.value._id,
      type: "text",
    };
  
    console.log("Sending message payload:", payloadObj);
  
    // Validate required fields
    if (!payloadObj.groupId || !payloadObj.content || !payloadObj.senderId) {
      console.error("Missing required fields:", {
        hasGroupId: !!payloadObj.groupId,
        hasContent: !!payloadObj.content,
        hasSenderId: !!payloadObj.senderId,
      });
      return;
    }
  
    // Generate a temporary ID for optimistic update
    const tempMessage = {
      _id: Date.now().toString(), // Temporary ID for frontend
      group: payloadObj.groupId,
      content: payloadObj.content,
      sender: { _id: payloadObj.senderId }, // Match backend format
      attachments: [],
      type: payloadObj.type,
      readBy: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
      status: "sending", // Mark as sending
    };
  
    // Optimistically add the message to the UI
    allMessages.value = [...allMessages.value, tempMessage];
  
    // Emit the message to the server
    socket.value?.emit("message.new", payloadObj, (response: any) => {
      if (response?.success) {
        // Update the message with the actual ID returned from the server
        allMessages.value = allMessages.value.map((msg) =>
          msg._id === tempMessage._id
            ? { ...msg, _id: response.messageId, status: "sent" }
            : msg
        );
      } else {
        // Handle failure case (message could not be sent)
        console.error("Message sending failed:", response?.error);
        allMessages.value = allMessages.value.map((msg) =>
          msg._id === tempMessage._id ? { ...msg, status: "failed" } : msg
        );
      }
    });
  };
  
  onMounted(() => {
    initializeSocket();
  });

  onUnmounted(() => {
    if (socket.value) {
      console.log("Cleaning up WebSocket listeners...");
      socket.value.off("connect");
      socket.value.off("disconnect");
      socket.value.off("error");
      socket.value.off("group.update");
      socket.value.off("message.new");
      socket.value.off("messages.update");
      socket.value.disconnect();
      socket.value = null;
    }
  });

  return {
    allMessages, // Expose the combined messages list
    isConnected,
    sendMessage,
  };
};