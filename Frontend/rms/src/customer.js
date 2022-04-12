
function printCustomers(data, setX) {

    setX(data.map((item, index) => {
    return ( 
        <tr>
            {item.name} {item.id}
        </tr>   
    )
}))
}

function customer(){

    const [data, setData] = useState([]);
    const [X, setX] = useState(<></>);
    
    useEffect(() => {
        fetch('http://localhost:3001/')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            printCustomers(data, setX);
            setData(data);
        })
    }, []);

    return (
        <div>
            {X}
        </div>
    )
}