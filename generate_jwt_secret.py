import secrets

# Generate a secure random string for JWT_SECRET
jwt_secret = secrets.token_hex(32)
print(jwt_secret)
