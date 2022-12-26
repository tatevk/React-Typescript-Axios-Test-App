//rendering our result to the browser
import {getAPI, postAPI} from './API' // import the api helper
import React,  {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';

export interface IUser {
    firstname: string;
    lastname: string;
    email: string;
    car: string;
    purchasedate: string;
}

export default function App(this: any) {
    const [data, setData] = React.useState({
        results: []
    }) // set state to hold the result

    React.useEffect(()=>{
        getData()
    }, [])

    const getData = () => getAPI("https://randomuser.me/api").then(
        (res) => {
            if(res.status === 200){
                setData(res.data)
                console.log(res.data.results)
            }else{
                console.log(res)
            }
        }
    )
    const submitForm = (event: any):void => {
        event.preventDefault();

        const target = event.target;
        const sendData:IUser = {firstname: target.firstname.value,
            lastname: target.lastname.value,
            email: target.email.value,
            car:target.cars.value,
            purchasedate: target.date.value
        };
        postAPI("https://acc-test-vjn7.onrender.com/form", sendData).then(
            (res) => {
                if(res.status === 200){
                    setData(res.data)
                    //alert(' User data hase sent successfully')
                    toast.success("User data hase sent successfully!");

                }else{
                    console.log(res)
                }
            }
        )

    }
    const [dateValue, setDateValue] = useState("");
    const onDateChange = (e: any) => {
        setDateValue(e.target.value);
    };
        // @ts-ignore
    return (
        <form  onSubmit={submitForm}>

                {
                    data.results?.map(({id, name, email}: any) => <div key={id}>
                            <input  name="firstname" value={name.first} readOnly /><br/>
                            <input  name="lastname" value={name.last} readOnly /><br/>
                            <input  name="email" value={email} readOnly /><br/>
                            <select name="cars" id="cars">
                                <option value="Golf">Golf</option>
                                <option value="Arteon">Arteon</option>
                                <option value="Tiguan">Tiguan</option>
                            </select><br/>
                        <input type="date" id="start" name="date"
                               value={dateValue}
                               onChange={onDateChange}
                               min="2018-01-01" />
                    </div>
                    )
                }
            {data.results ? <button disabled={!dateValue} type="submit" className="left-button" id="left-button">Send Data</button> : ''
            }
            <ToastContainer style={{ width: "200px",  height:50}}/>
        </form>
    )}
