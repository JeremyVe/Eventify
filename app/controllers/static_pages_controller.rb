class StaticPagesController < ApplicationController
 # before_action :authenticate_user!, only: [:index]

  def index
  end

  def login

  end

  def signup

  end

  private

  def authenticate_user!
    redirect_to login_path unless current_user
  end
end
