import { google } from "googleapis";

// Authenticate using a service account
async function authenticate() {
    return new google.auth.GoogleAuth({
        keyFile: "service-account.json", // Path to your service account key file
        scopes: ["https://www.googleapis.com/auth/admin.directory.group.readonly"],
    });
}

// Fetch Google Group members
async function listGroupMembers() {
    try {
        const auth = await authenticate();
        const service = google.admin({ version: "directory_v1", auth });
        const groupEmail = "something@yourdomain.com"; // Change this

        const response = await service.members.list({ groupKey: groupEmail });
        console.log("✅ Group Members:", response.data.members);
    } catch (error) {
        console.error("❌ Error fetching members:", error.message);
    }
}

// Main function to execute the API call
async function main()     {
    console.log("🔄 Fetching Google Group members...");
    await listGroupMembers();
}

await main().catch(error => console.error(error));
