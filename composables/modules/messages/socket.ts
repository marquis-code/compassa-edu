// import { ref, onMounted, onUnmounted } from "vue";
// import { io, Socket } from "socket.io-client";
// import { useUser } from "@/composables/auth/user";
// import { useCustomToast } from "@/composables/core/useCustomToast";
// import { useGetAllGroups } from '@/composables/modules/group/useGetAllGroups'
// import { useGetUserGroups } from '@/composables/modules/group/useGetUserGroups'
// import { useGetGroupMessages } from '@/composables/modules/messages/useGetGroupMessages'

// const { showToast } = useCustomToast();
// const { userGroupsList, loading, fetchUserGroups } = useGetUserGroups()

// export const useWebSocket = () => {
//   const { token, user } = useUser();
//   console.log(user.value._id, token.value, 'user from socker')
//   const messages = ref<any[]>([]);
//   const isConnected = ref(false);
//   const socket = ref<Socket | null>(null);
//   const { messages: messagesList, loading, fetchGroupMessages } = useGetGroupMessages ()
//   const { groups, loading: fetchingGroups  } = useGetAllGroups()

//   // Initialize the WebSocket connection
//   const initializeSocket = () => {
//     socket.value = io("https://compassa-edu-backend.onrender.com/", {
//       query: {
//         userId: user.value._id,
//         token: token.value,
//       },
//       transports: ["websocket"],
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//     });

//     // Connection events
//     socket.value.on("connect", () => {
//       showToast({
//         title: "Success",
//         message: "WebSocket connection established!",
//         toastType: "success",
//         duration: 3000,
//       });
//       isConnected.value = true;
//       fetchUserGroups()
//       // fetchGroupMessages()
//     });

//     socket.value.on("disconnect", () => {
//       showToast({
//         title: "Disconnected",
//         message: "WebSocket connection lost.",
//         toastType: "error",
//         duration: 3000,
//       });
//       isConnected.value = false;
//     });

//     socket.value.on("error", (error) => {
//       showToast({
//         title: "Error",
//         message: `WebSocket error: ${error}`,
//         toastType: "error",
//         duration: 3000,
//       });
//       isConnected.value = false;
//     });

//     // Handle new messages
//     socket.value.on("message.new", (message: any) => {
//       console.log('new mwssag ppppppppp', message)
//       if (message && !messages.value.some((msg) => msg.id === message.id)) {
//         messages.value.push({
//           ...message,
//           status: "received",
//         });
//       }
//     });

//         // Handle new messages
//   socket.value.on("message.fetch", (message: any) => {
//           console.log('new mwssag ppppppppp', message)
//           if (message && !messages.value.some((msg) => msg.id === message.id)) {
//             messages.value.push({
//               ...message,
//               status: "received",
//             });
//           }
//         });

//     // Handle messages update
//     socket.value.on("messages.update", (updatedMessages: any[]) => {
//       messages.value = updatedMessages.map((msg) => ({
//         ...msg,
//         status: "received",
//       }));
//     });


//     socket.value.on("group.update", (data) => {
//       console.log("Group update event received:", data);
//       // Handle the data received from the group update
//     });
//   };

//   // Fetch initial group messages
//   const getGroupMessages = async (groupId: string) => {
//     try {
//       const response = await $fetch(`/messages/group/${groupId}`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token.value}`,
//         },
//       });

//       messages.value = response.map((msg: any) => ({
//         ...msg,
                                     
//       }));
//     } catch (error) {
//       console.error("Failed to fetch group messages:", error);
//     }
//   };

//   // Send a new message
//   const sendMessage = async (content: string, groupId: string) => {
//     if (!socket.value?.connected) {
//       showToast({
//         title: "Error",
//         message: "WebSocket is not connected. Please try again.",
//         toastType: "error",
//         duration: 3000,
//       });
//       return;
//     }

//     const tempId = `temp-${Date.now()}-${Math.random().toString(36).substring(7)}`;
//     const tempMessage = {
//       id: tempId,
//       groupId,
//       content,
//       senderId: user.value.id,
//       type: "text",
//       status: "sending",
//       timestamp: new Date().toISOString(),
//     };

//     // Add temp message to the chat
//     messages.value.push(tempMessage);

//     // Emit the message to the server
//     socket.value.emit("message.new", tempMessage, (response: any) => {
//       if (response.status === "success") {
//         // Replace temp message with the actual message data
//         messages.value = messages.value.map((msg) =>
//           msg.id === tempId ? { ...response.data, status: "sent" } : msg
//         );
//       } else {
//         // Mark the message as failed
//         messages.value = messages.value.map((msg) =>
//           msg.id === tempId ? { ...msg, status: "error" } : msg
//         );
//         console.error("Failed to send message:", response.message);
//       }
//     });
//   };

//   // Join a group
//   const joinGroup = async (groupId: string) => {
//     try {
//       const response = await $fetch(`/groups/join/${groupId}`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token.value}`,
//         },
//       });
//       console.log("Joined group:", response);
//     } catch (error) {
//       console.error("Failed to join group:", error);
//     }
//   };

//   // Mark messages as read
//   const markMessagesAsRead = async (groupId: string) => {
//     try {
//       await $fetch(`/messages/group/${groupId}/mark-read`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token.value}`,
//         },
//       });
//       console.log("Marked messages as read for group:", groupId);
//     } catch (error) {
//       console.error("Failed to mark messages as read:", error);
//     }
//   };

//   // Cleanup on component unmount
//   onMounted(() => {
//     initializeSocket();
//   });

//   onUnmounted(() => {
//     if (socket.value) {
//       socket.value.off("message.new");
//       socket.value.off("messages.update");
//       socket.value.disconnect();
//       socket.value = null;
//     }
//   });

//   return {
//     messages,
//     isConnected,
//     getGroupMessages,
//     sendMessage,
//     joinGroup,
//     markMessagesAsRead,
//   };
// };


import { ref, onMounted, onUnmounted } from "vue";
import { io, Socket } from "socket.io-client";
import { useUser } from "@/composables/auth/user";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { useGetAllGroups } from "@/composables/modules/group/useGetAllGroups";
import { useGetUserGroups } from "@/composables/modules/group/useGetUserGroups";
import { useGetGroupMessages } from "@/composables/modules/messages/useGetGroupMessages";

export const useWebSocket = () => {
  const { showToast } = useCustomToast();
  const { userGroupsList, fetchUserGroups } = useGetUserGroups();
  const { messages: messagesList, fetchGroupMessages } = useGetGroupMessages();
  const { groups, loading: fetchingGroups } = useGetAllGroups();

  const { token, user } = useUser();
  const messages = ref<any[]>([]);
  const isConnected = ref(false);
  const socket = ref<Socket | null>(null);

  // Initialize the WebSocket connection
  const initializeSocket = () => {
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
    socket.value.on("connect", () => {
      console.log("WebSocket connected");
      showToast({
        title: "Success",
        message: "WebSocket connection established!",
        toastType: "success",
        duration: 3000,
      });
      isConnected.value = true;
      fetchUserGroups();
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

    socket.value.on("error", (error) => {
      console.error("WebSocket error:", error);
      showToast({
        title: "Error",
        message: `WebSocket error: ${error}`,
        toastType: "error",
        duration: 3000,
      });
      isConnected.value = false;
    });

    // Handle group update event
    socket.value.on("group.update", (data) => {
      console.log("Received group.update event:", data);
      // Update the groups or handle the data as needed
      fetchUserGroups(); // Refresh user groups
    });

    // Handle new messages
    socket.value.on("message.new", (message: any) => {
      console.log("Received new message:", message);
      if (message && !messages.value.some((msg) => msg.id === message.id)) {
        messages.value.push({
          ...message,
          status: "received",
        });
      }
    });

    // Handle fetched messages
    socket.value.on("message.fetch", (message: any) => {
      console.log("Fetched message:", message);
      if (message && !messages.value.some((msg) => msg.id === message.id)) {
        messages.value.push({
          ...message,
          status: "received",
        });
      }
    });

    // Handle messages update
    socket.value.on("messages.update", (updatedMessages: any[]) => {
      console.log("Messages updated:", updatedMessages);
      messages.value = updatedMessages.map((msg) => ({
        ...msg,
        status: "received",
      }));
    });
  };

  // Cleanup on component unmount
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
    messages,
    isConnected,
  };
};
