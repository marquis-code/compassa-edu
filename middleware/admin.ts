// import { useUser } from "@/composables/auth/user";
// import { useRouter } from "vue-router";

// export default defineNuxtRouteMiddleware((to, from) => {
//     const { isLoggedIn, user } = useUser();
//     const router = useRouter();

//     // If the user is not logged in and trying to access restricted routes, redirect to "/login"
//     if (!isLoggedIn.value && to.path !== "/login" && to.path !== "/") {
//         return router.push("/login");
//     }

//     // If the user is logged in and trying to access the login page or the root "/", redirect them to "/dashboard"
//     if (isLoggedIn.value && (to.path === "/login" || to.path === "/")) {
//         return router.push("/dashboard");
//     }

//     // Admin-specific checks
//     if (isLoggedIn.value && user.value?.role === "admin") {
//         // Redirect admin users from "/dashboard" to "/admin-panel"
//         if (to.path === "/dashboard") {
//             return router.push("/admin/dashboard");
//         }
//     } else {
//         // Redirect non-admins trying to access "/admin-panel" to "/dashboard"
//         if (to.path === "/admin/dashboard") {
//             return router.push("/dashboard");
//         }
//     }
// });


import { useUser } from "@/composables/auth/user";
import { useRouter } from "vue-router";

export default defineNuxtRouteMiddleware((to, from) => {
    const { isLoggedIn, user } = useUser();
    const router = useRouter();

    // If the user is not logged in and trying to access restricted routes, redirect to "/login"
    if (!isLoggedIn.value && to.path !== "/login" && to.path !== "/") {
        return router.push("/login");
    }

    // If the user is logged in and trying to access the login page or the root "/", redirect them accordingly
    if (isLoggedIn.value) {
        if (user.value?.role === "admin") {
            // Always redirect admins to the admin dashboard
            if (to.path !== "/admin/dashboard") {
                return router.push("/admin/dashboard");
            }
        } else {
            // Redirect users from login page or root to their dashboard
            if (to.path === "/login" || to.path === "/") {
                return router.push("/dashboard");
            }

            // Prevent users from accessing the admin dashboard
            if (to.path.startsWith("/admin")) {
                return router.push("/dashboard");
            }
        }
    }
});