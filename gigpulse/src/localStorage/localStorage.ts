export const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    return { token, name };
  };
  
  /**
   * fonction qui place le token reçu en param dans le localStorage
   * elle est executée quand on a le token donc quand on est connecté
   */
  export const setTokenToLocalStorage = (token: string, name: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
  };
  
  /**
   * fonction qui supprime le token du localStorage
   * elle est executée quand on on clique sur le bouton de deconnexion
   */
  export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  };