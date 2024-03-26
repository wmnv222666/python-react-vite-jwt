import React, { useState } from 'react';
import axiosInstance from './axios';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Post = (props) => {
    const { post } = props;
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(post.title);
    const [excerpt, setExcerpt] = useState(post.excerpt);

    const handleDelete = () => {
        axiosInstance.delete(`blog_api/${post.id}/`)
            .then(response => {
                console.log('删除成功');
                // 在删除成功后刷新页面或重新加载数据
            })
            .catch(error => {
                console.error('删除失败', error);
            });
    };

    const handleUpdate = () => {
        axiosInstance.put(`blog_api/${post.id}/`, { title, excerpt })
            .then(response => {
                console.log('更新成功', response.data);
                // 在更新成功后刷新页面或重新加载数据
                setEditing(false);
            })
            .catch(error => {
                console.error('更新失败', error);
            });
    };

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            {/* 显示编辑和删除按钮 */}
            {editing ? (
                <>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="text" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
                    {/* 保存按钮只有在编辑状态且当前用户是作者时才显示 */}
                    {post.author === localStorage.getItem('user_id') && (
                        <Button onClick={handleUpdate}>保存</Button>
                    )}
                </>
            ) : (
                <>
                    {/* 编辑和删除按钮只有在非编辑状态且当前用户是作者时才显示 */}
                    {post.author === localStorage.getItem('user_id') && (
                        <>
                            <Button onClick={() => setEditing(true)}><EditIcon /></Button>
                            <Button onClick={handleDelete}><DeleteIcon /></Button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Post;
