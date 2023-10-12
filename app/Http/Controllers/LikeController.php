<?php

namespace App\Http\Controllers;

use App\Models\Emotion;
use App\Models\Like;
use App\Models\Post;
use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function LikePost(Request $request, Post $post, $emotion){
        $user = Auth::user();
        $validEmotions = ['like', 'love', 'haha', 'wow', 'sad', 'angry'];
        if (!in_array($emotion, $validEmotions)){
            return response()->json(['error' => 'Invalid emotion type'], 400);
        }
        $existingLike = Like::where('user_id', $user->id)->where('post_id', $post->id)->where('emotion', $emotion)->first();
        if ($existingLike) {
            $existingLike->delete();
            $message = 'Unliked successfully';
        } else {
            Like::create([
                'user_id' => $user->id,
                'post_id' => $post->id,
                'emotion' => $emotion,
            ]);
            $message = 'Liked successfully';
        }
        return response()->json(['message' => $message]);
    }
    public function FetchLikeInPost(Post $post){
        $likes = Like::where('post_id',$post->id)->get();
        return response()->json($likes);
    }
}