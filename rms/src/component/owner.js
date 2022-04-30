import React, { useEffect } from "react";
import { useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    ArcElement,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line,Bar } from 'react-chartjs-2';
  import { Pie } from 'react-chartjs-2';


  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );
  export const options2 = {
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'No Of Orders'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Days'
        }
      }],
    }  ,
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: "Total orders for each day",
        },
      },
    };
 export const options = {
  scales: {
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Revenue(INR)'
      }
    }],
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Days'
      }
    }],
  }  ,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: "Revenue(INR) for each day",
      },
    },
  };
  export const options1 = {
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'No Of Orders'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Days'
        }
      }],
    }  ,
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: "Total orders for each day",
        },
      },
    };
function PrintLineChart(d,seta,setb){
    const  labels = [];
    const  y = [];
    const  z = []
    
    for(let i of d){
        labels.push(parseInt(i["day"]));
        y.push(parseInt(i["price"]));
        z.push(parseInt(i["orders"]));
    }
    
    var data1 ={};
    var data2 = {};
    data1 = {
        labels,
        datasets: [
            {
            label: "Revenue",
            data: y,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'black',
            pointRadius: 5
            },
        ],
        };
        data2 = {
          labels,
          datasets: [
              {
              label: "Orders",
              data: z,
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
              pointRadius: 5
              },
          ],
          };
          seta(<div style={{ height:"",width:"900px",backgroundColor:"white"}}>
          <br></br>
          <Line options={options} data={data1} />
          </div>)
          setb(<div style={{ height:"",width:"900px",backgroundColor:"white"}}>
          <br></br>
          <Line options={options1} data={data2} />
          </div>)
          
        return(<></>)  
}
function PrintBarChart(d,setz){
  const  X = [];
  const  Y = []
  
  for(let i of d){
      X.push(parseInt(parseInt(i["item_id"])));
      Y.push(parseInt(parseInt(i["c"])));
  }

  const data3= {
    labels: X,
    datasets: [
      {
        label: "Items",
        data: Y,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }
    ]
  }
  setz(<div className="match">
  <Bar data={data3} 
  options={options2}/>
</div>)
  return(
  <></>
  )
}
function PrintOwner(data, setX) {

    setX(data.map((item, index) => {
    return ( 
        <tr>
        <td>{item.name}</td>
        <td>{item.email}</td> 
        <td>{item.contact}</td> 
        <td>{item.address}</td> 
        <td>{item.share}</td> 
        <td>{item.salary}</td> 
     </tr>   
    )
}))
}
function Owner(){

    const [data, setData] = useState([]);
    const [X, setX] = useState(<></>);
    const [y, sety] = useState(<></>);
    const [S, setS] = useState(<></>);
    const [a,seta]  = useState(<></>);
    const [b,setb]  = useState(<></>);
    const [z,setz]  = useState(<></>);

    useEffect(() => {
        fetch('http://localhost:3001/owners')
        .then(res => res.json())
        .then(data => {
            setData(data);
            if (data.length !== 0){
                PrintOwner(data,setS);}
        })
    }, []);

function ShowSales() {
        fetch('http://localhost:3001/owners/sales')
          .then(res => res.json())
          .then(data => {
            setX(<></>);
            sety()
            // printfreqUsers(data,setX);
            setData(data);
            sety(PrintLineChart(data,seta,setb));
              return (
                  <></>
              );
    })
    fetch('http://localhost:3001/owners/sales/items')
    .then(res => res.json())
    .then(data1 => {
      setX(<></>);
      sety()
      // printfreqUsers(data,setX);
      setData(data1);
      
      // PrintBarChart(data1,setz);
      //   return (
      //       <></>
      //   );
})
}
return(
    <div>
        <tr>
            <tr>
        <th >Name</th>
        <th>Email</th>
        <th>Contact</th>
        <th>Address</th>
        <th>Share</th>
        <th>Salary</th>
        </tr>
        </tr>
        {S}
        <br></br><br></br>
        <button class="btn btn-secondary" type="button" onClick={ShowSales}>Sales Analytics</button> 
        <br></br><br></br>
        {y} 
        {a}
        {b}
        {z}
    </div>
)
}
export default Owner;