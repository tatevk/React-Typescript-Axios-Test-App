//rendering our result to the browser
import {getAPI, postAPI} from './API' // import the api helper
import React,  {useState} from "react";

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
    // const [
    //     isSuccessfullySubmitted,
    //     setIsSuccessfullySubmitted,
    // ] = React.useState(false);
    const submitHandler = (event: any):void => {
        event.preventDefault();

        const target = event.target;
        console.log('purchasedate', target.date.value);
        postAPI("https://acc-test-vjn7.onrender.com/form", {
            firstname: target.firstname.value,
            lastname: target.lastname.value,
            email: target.email.value,
            car:target.cars.value,
            purchasedate: target.date.value
        }).then(
            (res) => {
                console.log('res', res.data)
                if(res.status === 200){
                    setData(res.data)
                    alert(' User data hase sent successfully')
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
        return (
        <form  onSubmit={submitHandler}>

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
        </form>
    )}
