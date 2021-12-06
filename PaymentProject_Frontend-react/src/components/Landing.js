import React, {useState,useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom';

import axios from "axios";
import CustomerServices from './services/CustomerServices';
import DatePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import raw from './sdnlist.txt';
import PopUp from './PopUp';



function Landing() {
    

    const [todayDate,setTodayDate]=useState("");
    const [accountNumber,setAccountNumber] = useState("");
    const [accountHolderName, setAccountHolderName] = useState("");
    const [balanceAmount, setBalanceAmount] = useState("")
    const [overDraft, setOverDraft] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [receiverAccountNumber,setReceiverAccountNumber]=useState("");
    const [bicCode,setBicCode] = useState("");
    const [institutionName, setInstitutionName] = useState("");
    const [receiverName, setReceiverName] = useState("")
    const [amount, setAmount] = useState("")
    const [transferFee, setTranferFee] = useState("")
    const [clearBalance, setClearBalance] = useState("");
    const [transfertype,setTransferType]=useState()

   
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

const handleinput=(e)=>{
    if(e.target.name==="accountNumber"){
        setAccountNumber(e.target.value);
      console.log(accountNumber)
        axios.get("http://localhost:8093/api/v1/internaldata/"+e.target.value)
        .then (response =>{
            const data=response.data;
            console.log(data)
            setAccountHolderName(data.accountholdername)
            setBalanceAmount(data.clearbalance)
            setOverDraft(data.overdraft)
        })
    }
   
  //  console.log(accountHolderName)
}
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
// const calculatefee=(e)=>{
//     if(e.target.name==="amount"){
//         setAmount(e.target.value)
      
//       setTranferFee(e.target.value* (0.0025))
    
//       setClearBalance(parseFloat(balanceAmount)-parseFloat(amount)-parseFloat(transferFee))
//     }
//    const bal={clearBalance}
//    console.log(clearBalance)
//   //  console.log(accountHolderName)
// }
const checksdnlist =(e)=>{
    let sdnperson = e.target.value
    console.log(sdnperson)
    fetch(raw).then(r=>r.text()).then(text=>{
        setReceiverName(sdnperson)
        console.log(receiverName)
        // console.log(name)
        if(text.search(receiverName)>-1){
            console.log("success")
            document.getElementById("sdnlist").innerHTML = "Reciever is in sdnlist";
        }
        else{
            console.log("sorry")
            document.getElementById("sdnlist").innerHTML = "";

        }
    });


   
}

const checkbalance=(e)=>{
    setAmount(e.target.value)
    console.log(amount)
    if(balanceAmount<e.target.value*1.0025){
        if(overDraft==="yes"|| overDraft==="Yes"|| overDraft==="YES"){
            setTranferFee(e.target.value*0.0025)
            setClearBalance(balanceAmount-(e.target.value*1.0025))
            document.getElementById("funds").innerHTML = "";

        }
        else{
            console.log("no funds")
            setTranferFee("")
            setClearBalance("")
            document.getElementById("funds").innerHTML = "no funds!!!!!!!!!";
        }

    }
    else{
        document.getElementById("funds").innerHTML = "";
        setTranferFee(e.target.value*0.0025)
        setClearBalance(balanceAmount-e.target.value*1.0025)

    }
}
//|| accountHolderName!=="HDFC BANK C1A" || accountHolderName!=="HDFC BANK HOA" 
const checktransfertype=(e)=>{
    let text=e.target.value
    console.log(text)
   if(accountHolderName.search("HDFCBANK")>-1)
   {
       setTransferType(text)
       console.log(transfertype)
   
   if(text==="AccountTransfer")
   {
       document.getElementById("type").innerHTML = "Invalid type";
   
   }
   else{
   
   document.getElementById("type").innerHTML = "";
   
   }
   }
   else
   {
       setTransferType(text)
   if(text==="BankTransfer")
   {
   
   document.getElementById("type").innerHTML = "Invalid type"
   
   }
   else{
       document.getElementById("type").innerHTML = "";
   }
   }
}
const updateDatabase=(e)=>{
    setIsOpen(!isOpen);
    e.preventDefault();
    const clearbalance=clearBalance
    const accountholdername=accountHolderName
    const overdraft=overDraft
    const cust={accountholdername,clearbalance,overdraft}
    if(1)
    {
        axios.put("http://localhost:8093/api/v1/internaldata/"+accountNumber,cust)
        .then(response =>{
            console.log(response.data)
            //alert("transferred successfully")
        })
        .catch(error =>{
            console.log(error)
        })
    }
}
const customdates=current=>{
    return current.day()!==0 && current.day()!==6;
}
    return (
        <div class="root">
            <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
        <div className="card-body">
      
           <form>
              
               <div className="form-group mb-2">
                   <label className="control-label col-md-11" style={{marginTop:"1rem"}}>Today's Date</label>
                   {/* <input  
                       type="date"
                       name="todayDate"
                       className="form-control"
                       
                    /> */}
                    <DatePicker
                    timeFormat={false}
                    isValidDate={customdates}
                    />
               </div>
               <div className="form-group mb-2">
                   <label className="control-label col-md-11" >Sender Account Number</label>
                   <input  
                       type="text"
                       placeholder="Sender Account Number"
                       name="accountNumber"
                       className="form-control"
                       value={accountNumber}
                    onChange={handleinput}

                    
                   />
               </div>
               <div className="form-group mb-2">
                   <label className="control-label col-md-11">Account Holder Name</label>
                   <input  
                       type="text"
                       name="accountHolderName"
                       className="form-control" 
                       value={accountHolderName}
                       disabled
                    />
               </div>
               <div className="form-group mb-2">
                   <label className="control-label col-md-11">Balance Amount</label>
                   <input  
                       type="text"
                       name="balanceAmount"
                       className="form-control" 
                       value={balanceAmount}
                       disabled
                    />
               </div>
               <div className="form-group mb-2">
                   <label className="control-label col-md-11" >Over Draft</label>
                   <input  
                       type="text"
                       name="overDraft"
                       className="form-control" 
                       onChange={ (e) => setOverDraft(e.target.value)}
                       value={overDraft}
                       
                       disabled
                    />
               </div>
            

                   <div className="form-group mb-2">
                                <label className="control-label col-md-11">BIC CODE</label>
                                <input  
                                    type="text"
                                    placeholder="BIC CODE"
                                    name="bicCode"
                                    className="form-control"
                                    value={bicCode}
                                    onChange={handle}
                                  
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="control-label col-md-1l">Institution Name</label>
                                <input  
                                    type="text"
                                    name="institutionName"
                                    className="form-control"
                                    value={institutionName}
                                    
                                    disabled
                                    
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="control-label col-md-11">Receiver Account Number</label>
                                <input  
                                    type="text"
                                    placeholder="Enter Receiver Account Number"
                                    name="receiverAccountNumber"
                                    className="form-control"
                                    value={receiverAccountNumber}
                                    onChange={ (e) => setReceiverAccountNumber(e.target.value)}
                                   
                                />
                            </div>
                            
                            <div className="form-group mb-2">
                                <label className="control-label col-md-11">Receiver Name</label>
                                <p id="sdnlist" style={{color:"red"}}></p>
                                <input  
                                    type="text"
                                    placeholder="Enter Receiver Name"
                                    name="receiverName"
                                    className="form-control"
                                    value={receiverName}
                                    onChange={checksdnlist}

                                   
                                />
                            </div>
                            <div class="form-group mb-2">
                                <label className="control-label col-md-11">Transfer Type</label>
                                <p id="type" style={{color:"red"}}></p>
                                <select class="form-select" onChange={checktransfertype}>
                                <option selected disabled hidden> Select Transfer Type</option>
                                <option>BankTransfer</option>
                                <option>AccountTransfer</option>
                                
                                </select>
                            </div>
                            <div class="form-group ">
                                <label className="control-label col-md-11">Message Code</label>
                                <select class="form-select">
                                <option value="" selected disabled hidden> Select Message</option>
                                <option>CHQB - Beneficiary Customer must be paid by cheque only.</option>
                                <option>CORT - Payment is made in settlement for a trade.</option>
                                <option>HOLD - Beneficiary customer or claimant will call upon identification.</option>
                                <option>INTC - Payment between two companies that belongs to the same group.</option>
                                <option>PHOB - Please advise the intermediary institution by phone.</option>
                                <option>PHOI - Please advise the intermediary by phone.</option>
                                <option>PHON - Please advise the account with institution by phone.</option>
                                <option>REPA - Payments has a related e-Payments reference.</option>
                                <option>SDVA - Payment must be executed with same day value to the</option>
                                </select>
                            </div>
                            <div className="form-group mb-2">
                                <label className="control-label col-md-11" style={{marginTop:"1rem"}}>Amount to Transfer</label>
                                <input  
                                    type="text"
                                    placeholder="Enter Amount"
                                    name="amount"
                                    className="form-control"
                                    value={amount}
                                    onChange={checkbalance}
                                    // onChange={ (e) => setAmount(e.target.value)}
                                    // value={amount}
                                   
                                />
                                <p id="funds" style={{color:"red"}}></p>
                                {/* <p id="funds"></p> */}
                                {/* {errorMessage && <div className="error"> {errorMessage} </div>} */}
                            </div>
                            {/* <button type="button" class="btn btn-dark" onClick={checkbalance}>check</button> */}
                            
                            {/* <button type="button" class="btn btn-dark" onClick={updateDatabase} >update</button> */}
                            <div className="form-group mb-2">
                                <label className="control-label col-md-11">Transfer Fee</label>
                                <input  
                                    type="text"
                                    name="transferFee"
                                    className="form-control"
                                  //  onChange={ (e) => setTranferFee(e.target.value)}
                                    value={transferFee}
                                    disabled
                                   
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="control-label col-md-11">Clear Balance</label>
                                <input  
                                    type="text"
                                    name="clearBalance"
                                    className="form-control"
                                    
                                    value={clearBalance}
                                   disabled
                                />
                            </div>
                            <div>
                            <button type="button" class="btn btn-dark" style={{marginBottom:"5rem"}}onClick={updateDatabase} >Transfer</button>
                            {isOpen && <PopUp
                                    content={<>
                                        <b style={{ marginLeft: "5rem" }}>Transfer Successful</b><br />
                                        <b>Reciever Name:{receiverName}</b><br/>
                                        <b>Reciever AccountNumber: {receiverAccountNumber}</b><br/>
                                        <b>Reciever Bank:{institutionName}</b><br/>
                                        <b>Transfer Amount:{amount*1.0025}</b><br/>
                                        <b>Remaining balance:{clearBalance}</b><br/>
                                        <button className="btn btn-dark">ok</button><br/>
                                    </>}
                                    handleClose={togglePopup}
                                />}
               </div>
           </form>
       </div>
   </div>
    </div>
    </div>
        
    )
}
export default Landing
