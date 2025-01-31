import { useUser } from "@/composables/auth/user";
import { auth_api } from "@/api_factory/modules/auth";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { useRouter, useRoute } from "vue-router"; // Import useRoute for accessing current route
const { showToast } = useCustomToast();

const credential = {
  matric: ref(""),
  password: ref(""),
};

export const use_auth_login = () => {
  const router = useRouter();
  const route = useRoute(); // Access the current route
  const loading = ref(false);

  const isFormDisabled = computed(() => {
    return (
      loading.value || !credential.matric.value || !credential.password.value
    );
  });

  const login = async () => {
    loading.value = true;

    // Prepare payload
    const payload: Record<string, any> = {
      matric: credential.matric.value,
      password: credential.password.value,
    };

    // Append userType if the route is /admin
    if (route.path === "/admin") {
      payload.userType = "admin";
    }

    try {
      const res = (await auth_api.$_login(payload)) as any;
      loading.value = false;
      console.log(res, 'res here')

      if (res.type !== "ERROR") {
        useUser().createUser(res.data);
        showToast({
          title: "Success",
          message: "Login was successfully",
          toastType: "success",
          duration: 3000,
        });
        router.push("/dashboard");
        window.location.href = "/dashboard";
      } else {
        console.log(res, "test here");
        showToast({
          title: "Error",
          message: res?.data?.error || "Something went wrong",
          toastType: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      loading.value = false;
      console.error("Login error:", error);
      showToast({
        title: "Error",
        message: "An unexpected error occurred. Please try again.",
        toastType: "error",
        duration: 3000,
      });
    }
  };

  return { credential, login, loading, isFormDisabled };
};
