import { useEffect ,useState} from 'react';
import "../assets/css/home.css"
import { Link } from 'react-router-dom';
import { routes } from '../routes/routes';
import Modal from '../components/modal/modal';
import {URL,ApiCalls} from '../utils/ApiCalls';
import AddCampGround from '../components/form/addCampground';
import EditCampGround from '../components/form/editCampGround';
import Navbar from '../components/genericComponents/navbar';
import img1 from "../assets/images/img1.jpg"

export default function Home(){
    const [data, setData] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditData,setEditData] = useState(false);
    const [dataToEdit,setDataToEdit] = useState();

    const openModal = () => {
      setModalOpen(true);
    };

    const closeModal = () => {
      setModalOpen(false);
    };

    const closeEdit = ()=>{
      setEditData(false)
    }

    const editData= ()=>{
      setEditData(!isEditData)
    }

    const apiResponse = (url,res)=>{
      if(url===URL.getCampgrounds){
        setData(res.data)
      }
      if(url===URL.deleteCampground){
        if(res.status=200){
          ApiCalls("get",URL.getCampgrounds,{},apiResponse)
        }
      }
    }

    useEffect(() => {
      ApiCalls("GET",URL.getCampgrounds,{},apiResponse)
    }, []);

    const deleteHandler = (id)=>{
      ApiCalls("DELETE",URL.deleteCampground,{id:id},apiResponse)
    }
    
  
    return (
      <div>
        <Navbar></Navbar>
      <div className='cardParent'>
      
    {data.map((item,index) => (
      // <Link to={routes.campgroundDetail+item._id} className='card' key={item._id}>
        <div className='card' key={item._id}>
        <img src={require(`../assets/images/${item.imageUrl}.jpg`)} alt="test" className='cardImg'/>
        
        {/* <img src={img1} className='cardImg'/> */}

        <p className='boldtext'>Title: {item.title}</p>
        <p className='text'>Location: {item.location}</p>
        <p className='boldtext'>${item.price} SGD / Night</p>
        {/* Add more fields as needed */}
        {/* <Link to={routes.campgroundDetail+item._id} className='cardButton'>View Detail</Link> */}
        <div className='columnButton'>
        <button className='editButton' onClick={()=>{setDataToEdit(item);editData()}}  >Edit</button>
        <button className='deleteButton' onClick={()=>deleteHandler(item._id)} >Delete</button>
        </div>
      
      
      </div>
        
    ))}
      </div>
      {console.log(dataToEdit)}
      <div className='parent-container'>
      <button onClick={()=>openModal()} className='addButton'>add new campground</button>
      </div>
      {isEditData &&<Modal title="Edit CampGround" closeModal={closeEdit}>
        <EditCampGround  closeModal={editData} data={dataToEdit} setData={setData}></EditCampGround>
        </Modal>  }
      {isModalOpen && <Modal title="Add CampGround" closeModal={closeModal}>
        <AddCampGround closeModal={closeModal} setData={setData}></AddCampGround>
        </Modal> }
      </div>
    );
}


