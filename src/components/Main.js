import React, {useState, useRef} from 'react';
import './style.css'
import threedot from './3dot.png';



const TaskTile = (props)=>{

    return(
        <div className='task-tile' 
            draggable='true'     
            onDragStart={props.drag_function}
            >
            <p className='tile-content'>{props.content}</p>
        </div>
    )
}




const Main = ()=>{
    const [notStartedList, setNotStartedList] = useState(['Wakeup', 'TaskB'])
    const [progressList, setProgressList] = useState(['DoingProject'])
    const [completedList, setCompletedList] = useState(['Sleep'])

    const box1 = useRef()
    const box2 = useRef()
    const box3 = useRef()

    
    
    const startedDraggable = (e)=>{
        var curr = e.target;
        let content = curr.innerText;
        console.log(content)

        function dropFun(){
            setNotStartedList(notStartedList=> notStartedList.filter(item => (item === content)? false : true))
            setProgressList(progressList => {
                if(!progressList.includes(content)){
                    return [...progressList, content]
                }
                return progressList;
            })

            box2.current.removeEventListener("drop", dropFun);
        }

        box2.current.addEventListener("dragover", (event)=>event.preventDefault())
        box2.current.addEventListener("drop", dropFun)

        function dropFun2(){
            setNotStartedList(notStartedList => notStartedList.filter(item => (item == content)? false : true))
            setCompletedList(completedList => {
                if(!completedList.includes(content)){
                    return [...completedList, content];
                }
                return completedList;
            })

            box3.current.removeEventListener("drop", dropFun2)
        }

        box3.current.addEventListener("dragover", (event)=>event.preventDefault())
        box3.current.addEventListener("drop", dropFun2)
        
        
    }

    
    const progessDraggable = (e)=>{
        var curr = e.target;
        let content = curr.innerText;
        console.log(content);
        
        function dropFun(){
            setProgressList(progressList => progressList.filter(item => (item === content)? false : true))
            setNotStartedList(notStartedList => {
                if(!notStartedList.includes(content)){
                    return [...notStartedList, content];
                }
                return notStartedList;
            })    

            box1.current.removeEventListener("drop", dropFun);
        }

        box1.current.addEventListener("dragover", (event)=>event.preventDefault())
        box1.current.addEventListener("drop", dropFun)
        
        function dropFun2(){
            setProgressList(progressList => progressList.filter(item => (item === content)? false : true))
            setCompletedList(completedList => {
                if(!completedList.includes(content)){
                    return [...completedList, content];
                }
                return completedList;
            })

            box3.current.removeEventListener("drop", dropFun2);
        }


        box3.current.addEventListener("dragover", (event)=>event.preventDefault())
        box3.current.addEventListener("drop", dropFun2)
    }

    
    const completedDraggable = (e)=>{
        var curr = e.target;
        let content = curr.innerText;
        console.log(content);

        function dropFun(){
            setCompletedList(completedList => completedList.filter(item => (item === content)? false : true))
            setNotStartedList(notStartedList => {
                if(!notStartedList.includes(content)){
                    return [...notStartedList, content];
                }
                return notStartedList;
            })

            box1.current.removeEventListener("drop", dropFun);
        }

        box1.current.addEventListener("dragover", (event)=>event.preventDefault())
        box1.current.addEventListener("drop", dropFun)

        function dropFun2(){
            setCompletedList(completedList => completedList.filter(item => (item === content)? false : true))
            setProgressList(progressList => {
                if(!progressList.includes(content)){
                    return [...progressList, content];
                }
                return progressList;
            })
        }

        box2.current.addEventListener("dragover", (event)=>event.preventDefault())
        box2.current.addEventListener("drop", dropFun2)
    }

    
    const addNotStartedList = ()=>{
        const data = prompt("Enter the Context")
        setNotStartedList(notStartedList => [...notStartedList, data])
    }
    const addProgressList = ()=>{
        const data = prompt("Enter the Context")
        setProgressList(progressList => [...progressList, data])
    }
    const addCompletedList = ()=>{
        const data = prompt("Enter the Context")
        setCompletedList(completedList => [...completedList, data])
    }

    return(
        <div>
            <div className='conatiner-outer'>
                <div className='container-task-notstarted container-item' ref={box1}>
                    <div className='header'>
                        <h2>Not started</h2>
                        <p className="count_task">{notStartedList.length}</p>
                        <button className='split'><img className='logo' src={threedot} alt="Error!"/></button>
                        <button onClick={addNotStartedList}><span>+</span></button>
                    </div>
                    
                    <div className='notstarted-list-body'>
                        {
                            notStartedList.map((el, index)=>{
                                if(el === "") return null;
                                return <TaskTile key = {index} content= {el} drag_function = {startedDraggable}/>
                            })
                        }
                    </div>
                    
                    <div className='card-insert-btn'>
                        <button onClick={addNotStartedList}><span>+New</span></button>
                    </div>
                </div>

                <div className='container-task-inprogress container-item' ref={box2}>
                    <div className='header'>
                        <h2>In Progress</h2>
                        <p className="count_task">{progressList.length}</p>
                        <button className='split'><img className='logo' src={threedot} alt="Error!"/></button>
                        <button onClick={addProgressList}><span>+</span></button>
                    </div>

                    <div className='progress-list-body' >
                        {
                            progressList.map((el)=>{
                                if(el === "") return null;
                                return <TaskTile content= {el} drag_function = {progessDraggable}/>
                            })
                        }
                    </div>
                    
                    <div className='card-insert-btn'>
                        <button onClick={addProgressList}><span>+New</span></button>
                    </div>
                </div>

                <div className='container-task-completed container-item' ref={box3}>
                    <div className='header'>
                        <h2>Completed</h2>
                        <p className="count_task">{completedList.length}</p>
                        <button className='split'><img className='logo' src={threedot} alt="Error!"/></button>
                        <button onClick={addCompletedList}><span>+</span></button>
                    </div>

                    <div className='completed-list-body'>
                        {
                            completedList.map((el)=>{
                                if(el === "") return null;
                                return <TaskTile content = {el} drag_function = {completedDraggable}/>
                            })
                        }
                    </div>
                    <div className='card-insert-btn'>
                        <button onClick={addProgressList}><span>+New</span></button>
                    </div>
                    
                </div>
            </div>


            
            
        </div>
    )
}

export default Main;