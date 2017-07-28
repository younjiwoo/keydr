class UsersController < ApplicationController
  def new
    @user = User.create
  end

  def create
    @user = User.create(user_params)
    # Signing up should also log a user in.
    login(@user)
    redirect_to root_path
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password)
  end
end
