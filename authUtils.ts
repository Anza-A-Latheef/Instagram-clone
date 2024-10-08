export const checkAuthentication = (): boolean => {
    const token = localStorage.getItem('authToken'); // or retrieve from cookies
    return !!token;  // Return true if a token exists, otherwise false
};
