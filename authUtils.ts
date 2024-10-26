export const checkAuthentication = (): boolean => {
    const token = localStorage.getItem('authToken'); 
    return !!token;  
};
