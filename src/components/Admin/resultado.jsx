const Resultado = ({ tareas, setTarea }) => {

  console.log(tareas);


  return (
    <div>
      {tareas && tareas.length ? (
        <>
          {tareas.map((tarea, index) => (
            <div key={index}>
              <div>
                <p> <span>Nombre:</span> {tarea.nombre}</p>
                <p> <span>Descripcion:</span> {tarea.descripcion}</p>
                <button type="button" onClick={() => setTarea(tarea)}>Editar</button>
                <button>Eliminar</button>
                <hr />
              </div>
            </div>
          ))}
        </>
      ):(
        <>
        <p>No hay tareas</p>
        </>
      )}
    </div>
  )
}

export default Resultado
