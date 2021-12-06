import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";

function Transaction() {
    const [receiverAccountNumber,setReceiverAccountNumber]=useState("");
    const [bicCode,setBicCode] = useState("");
    const [institutionName, setInstitutionName] = useState("");
    const [receiverName, setReceiverName] = useState("")
    const [amount, setAmount] = useState("")
    const [transferFee, setTranferFee] = useState("")
    const [clearBalance, setClearBalance] = useState("")

    const history = useHistory();

    const handle=(e)=>{
        if(e.target.name==="bicCode"){
            setBicCode(e.target.value);
          console.log(bicCode)
            axios.get("http://localhost:8093/api/v1/receiverdata/"+e.target.value)
            .then (response =>{
                const data=response.data;
                console.log(data)
                setInstitutionName(data.institutionname)
                
            })
        }
       
      //  console.log(accountHolderName)
    }
    const calculatefee=(e)=>{
        if(e.target.name==="amount"){
            setAmount(e.target.value);
          console.log(bicCode)
          setTranferFee(e.target.value*0.025)
        }
       
      //  console.log(accountHolderName)
    }
    return (
        <div>
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h3>Transaction</h3>
                    <div className="card-body">
                        <form>
                        
                            <div className="form-group mb-3">
                                <label className="form-label">BIC CODE</label>
                                <input  
                                    type="text"
                                    placeholder="BIC CODE"
                                    name="bicCode"
                                    className="form-control"
                                    value={bicCode}
                                    onChange={handle}
                                  
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Institution Name</label>
                                <input  
                                    type="text"
                                    name="institutionName"
                                    className="form-control"
                                    value={institutionName}
                                    disabled
                                    
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Receiver Account Number</label>
                                <input  
                                    type="text"
                                    placeholder="Enter Receiver Account Number"
                                    name="receiverAccountNumber"
                                    className="form-control"
                                    value={receiverAccountNumber}
                                    onChange={ (e) => setReceiverAccountNumber(e.target.value)}
                                   
                                />
                            </div>
                            
                            <div className="form-group mb-3">
                                <label className="form-label">Receiver Name</label>
                                <input  
                                    type="text"
                                    placeholder="Enter Receiver Name"
                                    name="receiverName"
                                    className="form-control"
                                    value={receiverName}
                                    onChange={ (e) => setReceiverName(e.target.value)}

                                   
                                />
                            </div>
                            <div class="form-group mb-3">
                                <label className="form-label">Transfer Type</label>
                                <select class="form-select">
                                <option selected disabled hidden> Select Transfer Type</option>
                                <option>Bank Transfer</option>
                                <option>Account Transfer</option>
                                
                                </select>
                            </div>
                            <div class="form-group ">
                                <label className="form-label">Message Code</label>
                                <select class="form-select">
                                <option value="" selected disabled hidden> Select Message</option>
                                <option>CHQB</option>
                                <option>CORT</option>
                                <option>HOLD</option>
                                <option>INTC</option>
                                <option>PHOB</option>
                                <option>PHOI</option>
                                <option>PHON</option>
                                <option>REPA</option>
                                <option>SDVA</option>
                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Amount</label>
                                <input  
                                    type="text"
                                    placeholder="Enter Amount"
                                    name="amount"
                                    className="form-control"
                                    onChange={ calculatefee}
                                   
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Transfer Fee</label>
                                <input  
                                    type="text"
                                    name="transferFee"
                                    className="form-control"
                                    value={transferFee}
                                    disabled
                                   
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Clear Balance</label>
                                <input  
                                    type="text"
                                    name="clearBalance"
                                    className="form-control"
                                    style={{marginBottom:"5rem"}}
                                   disabled
                                />
                            </div>
                            {/* <button 
                                className="btn btn-success"
                                
                                 > Add Employee </button>
                            <Link to="/employees" className="btn btn-danger"> Cancel</Link> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Transaction
