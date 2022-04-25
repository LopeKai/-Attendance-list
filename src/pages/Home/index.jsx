import { useState,useEffect } from 'react'
import { Card } from '../../components/Card'
import './styles.css'

export function Home() {

  const [studentName, setStudentName] = useState('Usuário')
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({})

  function hangleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleDateString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }
    setStudents(prevState => [...prevState, newStudent])
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/lopekai')
      const data = await response.json()
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    }
    fetchData() 
  },[])

  return (
    <div className="container">
      <header>
        <h1>Lista de Presenças</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar}/>
        </div>
      </header>
      <input
        type="text"
        name="" id=""
        placeholder="Digite o nome..."
        onChange={(e) => setStudentName(e.target.value)}
      />
      <button type="button" onClick={hangleAddStudent}>
        Adicionar
      </button>

      {
        students.map((student) => (
          <Card key={student.time} name={student.name} time={student.time} />
        ))
      }
    </div>
  )
}

