class Api::V1::PostsController < ApplicationController
  skip_before_action :authenticated, only: %i[ index show ]
  before_action :set_post, only: %i[ show update destroy ]

  # GET /posts
  def index
    @posts = Post.all
    render json: @posts
  end

  # GET /posts/1
  def show
     render json: {
        post: @post,
        comments: @post.comments
      }

  end

  # POST /posts
  def create
    @post = Post.new(post_params)

    if @post.save
      render json: @post, status: :created, location: api_v1_posts_path(@post)
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy!    
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:user_id, :title, :body)
    end
end
