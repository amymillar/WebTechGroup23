const { loginUser, logoutUser } = require("../scripts/auth");

describe("Authentication Tests", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test("User can log in", () => {
        document.body.innerHTML = '<input id="username" value="TestUser">';
        loginUser();
        expect(localStorage.getItem("currentUser")).toBe("TestUser");
    });

    test("User can log out", () => {
        localStorage.setItem("currentUser", "TestUser");
        logoutUser();
        expect(localStorage.getItem("currentUser")).toBeNull();
    });
});
