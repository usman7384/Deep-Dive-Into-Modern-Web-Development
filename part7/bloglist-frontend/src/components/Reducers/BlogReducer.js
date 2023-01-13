import blogService from "../../services/blogs"

const blogReducer=(state=[],action)=>{
    switch(action.type){
        case 'INIT_BLOGS':
            return action.data
        case 'NEW_BLOG':
            return [...state,action.data]
        case 'LIKE_BLOG':
            return state.map(blog=>blog._id===action.data.id?action.data:blog)
        case 'DELETE_BLOG':
            return state.filter(blog=>blog._id!==action.data.id)
        case 'ADD_COMMENT':
            return state.map(blog=>blog._id===action.data.id?action.data:blog)
        default:
            return state
    }
}

export const initializeBlogs=()=>{
    return async dispatch=>{
        const blogs=await blogService.getAll()
        dispatch({
            type:'INIT_BLOGS',
            data:blogs
        })
    }
}

export const createBlog=(blog)=>{
    return async dispatch=>{
        const newBlog=await blogService.create(blog)
        dispatch({
            type:'NEW_BLOG',
            data:newBlog
        })
    }
}

export const likeBlog=(blog)=>{
    return async dispatch=>{
        const likedBlog=await blogService.update(blog._id)
        dispatch({
            type:'LIKE_BLOG',
            data:likedBlog
        })
    }
}

export const deleteBlog=(blog)=>{
    return async dispatch=>{
        await blogService.remove(blog._id)
        dispatch({
            type:'DELETE_BLOG',
            data:blog
        })
    }
}

export const addComment=(blog,comment)=>{
    return async dispatch=>{
        const commentedBlog=await blogService.addComment(blog._id,comment)
        dispatch({
            type:'ADD_COMMENT',
            data:commentedBlog
        })
    }
}
export default blogReducer
