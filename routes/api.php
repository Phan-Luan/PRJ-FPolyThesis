<?php

use App\Http\Controllers\Admin\AdminBlogController;
use App\Http\Controllers\Admin\AdminMajorController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\MajorController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\QaController;
use App\Http\Controllers\PrivateMessagesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//auth
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register'])->name('user.register');
    Route::get('/google-auth', [AuthController::class, 'googleAuth'])->name('user.googleAuth');
    Route::get('/google-callback', [AuthController::class, 'googleCallback'])->name('user.googleCallback');
    Route::post('/login', [AuthController::class, 'login'])->name('user.login');
    Route::post('/verify', [AuthController::class, 'verify'])->name('user.verify');
    Route::post('/post-forgot-password', [AuthController::class, 'forgotPassword'])->name('user.forgotPassword');
    Route::post('/post-reset-password', [AuthController::class, 'resetPassword'])->name('user.resetPassword');
});

Route::middleware('auth:api')->group(function () {
    //route has been authenticated
    Route::post('/auth/logout', [AuthController::class, 'logout'])->name('user.logout');
    Route::post('/auth/refresh-token', [AuthController::class, 'refreshToken'])->name('token.refresh');
    Route::get('/hello', function () {
        return 'ok';
    });
    //chat
    Route::prefix('messages')->group(function(){
        Route::get('/', [PrivateMessagesController::class, 'ShowAllMessage'])->name('message.show');
        Route::post('/', [PrivateMessagesController::class, 'SendMessages'])->name('message.create');
        Route::put('/{privateMessage}', [PrivateMessagesController::class, 'UpdateMessage'])->name('message.update');
        Route::delete('/{privateMessage}', [PrivateMessagesController::class, 'DeleteMessage'])->name('message.delete');
    });

    //major
    Route::get('majors',[MajorController::class,'list_majors']);

    //post
    Route::prefix('posts')->group(function () {
        Route::get('/newfeed',[PostsController::class,'ShowAllPosts'])->name('post.show');
        Route::get('/profile', [PostsController::class, 'ShowPostProfile'])->name('profile.show');
        Route::post('/', [PostsController::class, 'CreatePost'])->name('post.create');
        Route::put('/{post}', [PostsController::class, 'UpdatePost'])->name('post.update');
        Route::delete('/{post}', [PostsController::class, 'DeletePost'])->name('post.delete'); 
    });
    //blog
    Route::prefix('blogs')->group(function () {
        Route::get('/', [PostsController::class,'ShowAllBlogs'])->name('blog.show');
        Route::post('/', [BlogController::class, 'CreateBlog'])->name('blog.create');
        Route::put('/{blog}', [BlogController::class, 'UpdateBlog'])->name('blog.update');
        Route::delete('/{blog}', [BlogController::class, 'DeleteBlog'])->name('blog.delete');
    });
    //qa
    Route::prefix('quests')->group(function(){
        Route::get('/', [PostsController::class,'ShowAllQa'])->name('qa.show');
        Route::post('/', [QaController::class, 'CreateQa'])->name('qa.create');
        Route::put('/{qa}', [QaController::class, 'UpdateQa'])->name('qa.update');
        Route::delete('/{qa}', [QaController::class, 'DeleteqQ'])->name('qa.delete');
        Route::get('/list',[QaController::class,'ListQa'])->name('qa.list');
    });
    Route::prefix('like')->group(function () {
        //Like --post
        Route::post('/{post}', [LikeController::class, 'LikePost'])->name('like.post');
        //Like --blog
        Route::post('/{blog}', [LikeController::class, 'LikeBlog'])->name('like.blog');
        //Like --Q&a
        Route::post('/{qa}', [LikeController::class, 'LikeQa'])->name('like.qa');
    });
    Route::prefix('comment')->group(function () {
        //Comment --post
        Route::post('/{post}', [CommentController::class, 'AddCommentToPost'])->name('post.comment');
        //Comment --blog
        Route::post('/{blog}', [CommentController::class, 'AddCommentToBlog'])->name('blog.comment');
        //Comment --Q&a
        Route::post('/{qa}', [CommentController::class, 'AddCommentToQa'])->name('qa.comment');
    });
  
    //friend --relationship
    Route::post('/send-request/{recipient}', [FriendController::class, 'SendFriendRequest'])->name('friend.send');
    Route::post('/comfirm-request/{sender}', [FriendController::class, 'ConfirmFriendRequest'])->name('friend.confirm');
    Route::put('/update-relation/{friend}', [FriendController::class, 'UpdateFriendshipType'])->name('friend.update');
    Route::get('/friend', [FriendController::class, 'FetchAllFriend'])->name('friend.list');


    Route::group(['prefix' => 'admin', 'middleware' => 'scope:admin'], function () {
        //User Management
        Route::prefix('users')->group(function () {
            Route::get('/', [AdminUserController::class, 'listUser'])->name('admin.user.list');
            Route::get('/detail/{user}', [AdminUserController::class, 'detailUser'])->name('admin.user.detail');
            Route::put('/suspend/{user}', [AdminUserController::class, 'suspendUser'])->name('admin.user.suspend');
            Route::put('/active/{user}', [AdminUserController::class, 'activeUser'])->name('admin.user.active');
            Route::delete('/delete/{user}', [AdminUserController::class, 'deleteUser'])->name('admin.user.delete');
        });
        //Blog Management
        Route::prefix('blogs')->group(function () {
            Route::get('/list-approved', [AdminBlogController::class, 'listAllBlog'])->name('admin.blog.approved');
            Route::get('/list-pending', [AdminBlogController::class, 'listPedingBlog'])->name('admin.blog.pending');
            Route::get('/approve/{blog}', [AdminBlogController::class, 'approveBlog'])->name('admin.blog.approve');
            Route::get('/reject/{blog}', [AdminBlogController::class, 'rejectBlog'])->name('admin.blog.reject');
            Route::get('/detail/{blog}', [AdminBlogController::class, 'detailBlog'])->name('admin.blog.detailBlog');
        });
        //Major Admin
        Route::prefix('majors')->group(function () {
            Route::get('/', [AdminMajorController::class, 'index'])->name('admin.majors.index');
            Route::get('/{major}', [AdminMajorController::class, 'show'])->name('admin.majors.show');
            Route::post('/', [AdminMajorController::class, 'store'])->name('admin.majors.store');
            Route::put('/{major}', [AdminMajorController::class, 'update'])->name('admin.majors.update');
            Route::delete('/{major}', [AdminMajorController::class, 'destroy'])->name('admin.majors.destroy');
        });
    });
});
