class ApplicationController < ActionController::API
    before_action :authenticated 

    SECRETKEY = "123SecretKey"

    def encode_token(payload) 
        JWT.encode(payload, SECRETKEY)
    end

    def decode_token
        header = request.headers["Authorization"]
        print header
        if header 
            token = header.split(" ")[1]
            begin
                JWT.decode(token, SECRETKEY, true, algorithm: "HS256")
            rescue JWT::DecodeError
                nil
            end 
        end
    end 

    def identify_current_user 
        if decode_token
            user_id = decode_token[0]["user_id"]
            @user = User.find_by(id: user_id)
        end
    end

    def authenticated 
        unless !!identify_current_user 
        render json: {message: "Not logged in"}, status: :unauthorized
        end 
    end
end
