const url = process.env.URL + "/api/usuarios"

//TRAER USUARIOS POR ID
export const getUsuarioById = async (id) =>{
  try{
    const resp = await fetch(url + "/" + id)
    const data = await resp.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo obtener la info")
  }
}

export const crearUsuario = async (datos) => {
    try{
        const resp = await fetch(url + "/api/usuarios", {
            method: "POST",
            body: JSON.stringify(datos),
            headers:{
                "Content-type" : "application/json; charset=UTF-8",

            },
        })

        const data = await resp.json();

        return data
    } catch (error){
        console.log(error);
        return {msg: "No se conecto con Backend"}
    }
};