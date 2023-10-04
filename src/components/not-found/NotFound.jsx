import React from 'react'
import imgNotFound from '../../assets/img/img-error.jpg'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Esto establece la altura al 100% del viewport
    background: `url(${imgNotFound}) no-repeat center center fixed`,
    backgroundSize: 'cover', // Esto hace que la imagen cubra todo el fondo
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: '24px',
  },
};

const NotFound = () => {
  return (
    <div style={styles.container}>
      <div style={styles.text}>
        <p>Error 404 - Página no encontrada</p>
      </div>
    </div>
  );
};

export default NotFound