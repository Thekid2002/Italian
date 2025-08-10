document.addEventListener("DOMContentLoaded", () => {
    // Intercept all clicks on links
    document.body.addEventListener("click", async (e) => {
        const link = e.target.closest("a");
        if (link && link.href && link.origin === location.origin) {
            e.preventDefault();
            const url = link.href;
            navigateTo(url);
        }
    });

    // Handle back/forward navigation
    window.addEventListener("popstate", () => {
        navigateTo(location.pathname, false);
    });

    async function navigateTo(url, pushState = true) {
        try {
            const response = await fetch(url, { headers: { "X-Requested-With": "fetch" } });
            if (!response.ok) throw new Error("Network error");

            const htmlText = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, "text/html");

            const newBody = doc.querySelector("#body");
            if (newBody) {
                document.querySelector("#body").innerHTML = newBody.innerHTML;
            }

            if (pushState) {
                history.pushState(null, "", url);
            }
        } catch (err) {
            console.error("Navigation error:", err);
        }
    }
});
