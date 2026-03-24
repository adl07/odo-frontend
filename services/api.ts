import { getToken } from "@/lib/auth";


const token = getToken();

export const getPatients = async()=>{

    const url = process.env.NEXT_PUBLIC_API_URL
    const endpoit = "/patients"
    
    try {
        const res = await fetch(`${url}${endpoit}`,{
            method: "GET",
            cache: "no-store",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                
            }
        })

        if(!res.ok){
            throw new Error("Error fetching patients");
            
        }
        const result = await res.json();

        return result;

    } catch (error) {
        console.log("ocurrio un error al ejecutar GET_DATA", error)
        console.error("ocurrio un error al ejecutar GET_DATA", error)
    }
}


interface PatientInterface{
      nombre: string,
      dni: string,
      date: string,
      motivo: string,
      diagnostico?: string,
      codigo?: string,
      tratamiento?: string,
      observaciones?: string,
      doctorid: string
}

export interface ConsultInterface{
      nombre: string,
      dni: string,
      date: string,
      motivo: string,
      diagnostico?: string,
      codigo?: string,
      tratamiento?: string,
      observaciones?: string,
      doctorid: string
}

export const createPatient=async(data: PatientInterface ) =>{

    const url = process.env.NEXT_PUBLIC_API_URL
    const endpoit = "/patients"

    const payload = {
                fecha: data.date,
                dni: data.dni,
                nombre: data.nombre,
                motivo: data.motivo,
                diagnostico: data.diagnostico,
                codigo: data.codigo,
                tratamiento: data.tratamiento,
                observaciones: data.observaciones,
                doctorid: data.doctorid
    }

    try {
        const response = await fetch(`${url}${endpoit}`, {
            method: 'POST',
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload) 
        })

        if(!response.ok){
            throw new Error("Error al ejecutar createPatient")
        }
        const result = await response.json();
        return result
    } catch (error) {
        console.log("Error al ejecutar createPatient", error)
        console.error("Error al ejecutar createPatient", error)
    }
}

export const getConsultById = async (id: string) =>{
    const url = process.env.NEXT_PUBLIC_API_URL
    const endpoit = "/patients/"
    try {
        const response = await fetch(`${url}${endpoit}${id}`,{
            method: 'GET',
            headers:{
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })

        if(!response.ok){
            throw new Error('Ocurrio un error al consultar getPatientById')
        }

        const result = await response.json()
        return result
    } catch (error) {
        console.log('Error al ejecutar getPatientById',error)
        console.error('Error al ejecutar getPatientById', error)
    }
}

export const updateConsultById = async(id:string, data: ConsultInterface )=>{
    const url = process.env.NEXT_PUBLIC_API_URL
    const endpoint = "/patients/"

    const payload = {
        dni: data.dni,
        nombre: data.nombre,
        fecha: data.date,
        motivo: data.motivo,
        diagnostico: data.diagnostico,
        codigo: data.codigo,
        tratamiento: data.tratamiento,
        observaciones: data.observaciones,
        doctorid: data.doctorid
    }

    try {
        const response = await fetch(`${url}${endpoint}${id}`,{
            method: "PATCH",
            headers:{
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })

        if(!response.ok){
            throw new Error('Error al ejecutar updateConsultById')
        }

        const result = await response.json()
        return result 

    } catch (error) {
        console.log('Error al ejecutar updateConsultById', error)
        console.error('Error al ejecutar updateConsultById', error)
    }
}

export const deletePatientById = async (id: string) =>{

    const url = process.env.NEXT_PUBLIC_API_URL
    const endpoint = '/patients/'

    try {
        const response = await fetch(`${url}${endpoint}${id}`,{
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "Application/json"
            }
        })

        if(!response.ok){
            throw new Error('Ocurrio un error al ejecutar deletePatientById')
        }

        const result = response.status;    
        return result

    } catch (error) {
        console.log('Ocurrio un error al ejectuar deletePatientById', error)
        console.error('Ocurrio un error al ejectuar deletePatientById', error)
    }
}