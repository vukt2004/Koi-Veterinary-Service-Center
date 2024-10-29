import { jwtDecode } from 'jwt-decode';
export const getUserId = () => {
    const userId = jwtDecode(sessionStorage.getItem('user')).sub;
    console.log(userId);
    return userId;
}
