import type {UserResponse} from "~/types/github/user";

export default defineEventHandler(async (event) => {
    const rawCookie = getCookie(event, "GitHubOauthResponse")
    if (rawCookie === undefined) {
        return "Error"
    }
    const cookie = JSON.parse(<string>getCookie(event, "GitHubOauthResponse")) as OauthResponse

    return await $fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${cookie.access_token}`
        }
    }) as UserResponse
})
