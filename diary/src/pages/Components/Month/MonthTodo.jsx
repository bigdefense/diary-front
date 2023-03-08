import useOnClickOutside from '@/pages/hooks/useOnClickOutSide';
import React, { useRef, useState } from 'react'
import Button from '../Button';
import MonthListModal from '../MonthModal/MonthListModal';
import MonthTodoItem from './MonthTodoItem';

/**
 * 
 * @param {dayInfo} obj
 * @returns 
 */

const MonthTodo = ({dayInfo}) => {
  const [listVisible, setListVisible] = useState(false)
  const listModalRef = useRef()

  const handleListModalOpen = () => {
    setTimeout(()=> {
      setListVisible(true)
    }, 300)
  }
  const handleListModalClose = () =>{
    setListVisible(false)
  }

  useOnClickOutside(listModalRef, () => setListVisible(false))

  const {todos} = dayInfo
  const viewNum = todos?(todos.length>3?2:3):false
  
  const onChildDbclick = (e) =>{
    e.stopPropagation()
  }

  return (
    <>
    {todos.map((todo, idx)=>{
        if(idx<viewNum){
          return <MonthTodoItem key={idx} todo={todo} dayInfo={dayInfo} />
        } 
        if(idx===viewNum){
          return <>
          <Button onClick={()=>handleListModalOpen()} content={`일정 ${todos.length-2}개 더보기`} className="block font-semibold p-1 pl-2 my-2 mx-auto rounded hover:bg-gray-300 hover:cursor-pointer"/>
          <div onDoubleClick={onChildDbclick} ref={listModalRef}>
              <MonthListModal dayInfo={dayInfo} listVisible={listVisible} handleListModalClose={handleListModalClose}/>
          </div>
          </>
        }
        } 
        )}
    </>
  )
}

export default MonthTodo