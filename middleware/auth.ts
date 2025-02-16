// import { useUser } from "@/composables/auth/user";
// const { isLoggedIn } = useUser();
// const router = useRouter();

// export default defineNuxtRouteMiddleware((to, from) => {
//     // If the user is not logged in and trying to access any route other than "/login" or the root "/", redirect to "/login"
//     if (!isLoggedIn.value && to.path !== "/login" && to.path !== "/") {
//         return router.push("/login");
//     }

//     // If the user is logged in and trying to access the login page or the root "/", redirect them to "/dashboard"
//     if (isLoggedIn.value && (to.path === "/login" || to.path === "/")) {
//         return router.push("/dashboard");
//     }

//     // Allow access to all other routes for logged-in users
// });

import { useUser } from "@/composables/auth/user";
import { useRouter } from "vue-router";

export default defineNuxtRouteMiddleware((to, from) => {
    const { isLoggedIn, user } = useUser();
    const router = useRouter();

    // If the user is not logged in and trying to access any restricted route, redirect to "/login"
    if (!isLoggedIn.value && to.path !== "/login" && to.path !== "/") {
        return router.push("/login");
    }

    // If the user is logged in
    if (isLoggedIn.value) {
        if (user.value?.role === "user") {
            // Redirect users from login page or root to "/dashboard"
            if (to.path === "/login" || to.path === "/") {
                return router.push("/dashboard");
            }

            // Allow users to navigate freely within "/dashboard/*"
            if (to.path.startsWith("/dashboard")) {
                return;
            }

            // Prevent users from accessing "/admin/*"
            if (to.path.startsWith("/admin")) {
                return router.push("/dashboard");
            }
        }
    }
});
