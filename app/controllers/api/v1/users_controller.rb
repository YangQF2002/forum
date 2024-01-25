class Api::V1::UsersController < ApplicationController
  skip_before_action :authenticated, only: %i[ index show login create ]
  before_action :set_user, only: %i[ show update destroy ]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: api_v1_users_path(@user)
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end
  
  def login 
    @user = User.find_by!(name: login_params[:name])
    if @user.authenticate(login_params[:password])
      @token = encode_token(user_id: @user.id)
      render json: {
        user_id: @user.id,
        token: @token
      }, status: :accepted 

     else 
      render json: {
        message: "Password is incorrect"
      }, status: :unauthorized 
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:name, :password)
    end

    def login_params 
      params.permit(:name, :password)
    end
end
