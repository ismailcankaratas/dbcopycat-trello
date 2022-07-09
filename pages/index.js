import Link from "next/link";

import React, { useEffect } from 'react'
import ActionButton from "../components/ActionButton";
import Layout from "../components/Layout";
import List from "../components/List";
import { useSelector, useDispatch } from 'react-redux'
import { getList } from "../utils/features/listSlice";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function index() {
  const { lists } = useSelector(x => x.list);
  const dispatch = useDispatch();

  useEffect(() => {
    if (lists.length == 0) {
      dispatch(getList());
    }
  }, [lists]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    dispatch(sort(
      result.source.droppableId,
      result.destination.droppableId,
      result.source.index,
      result.destination.index,
      result.draggableId,
      result.type
    ))
  }

  return (
    <Layout title="Trello Clone">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-lists2" direction="horizontal" type="list">
          {provided => (
            <div
              {...provided.droppableProps} ref={provided.innerRef}
              className="flex items-start z-0 w-full justify-evenly flex-wrap rounded border-dashed border-2 border-gray-300 md:ml-36">
              {lists.length > 0 ?
                lists.map((list, key) => (
                  <List title={list.title} tasks={list.tasks} listId={list.id} key={list.id} index={key} />
                ))
                : ""
              }
              {provided.placeholder}
              <div>
                <ActionButton lists={lists} />
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Layout>
  )
}


index.auth = true;