
# Use the official Nginx image
FROM nginx:alpine

# Install OpenSSL to generate a self-signed certificate
RUN apk add --no-cache openssl

# Create a directory to hold the SSL certificates
RUN mkdir -p /etc/ssl/private /etc/ssl/certs

# Generate a self-signed SSL certificate
# Modify the subject details as needed
RUN openssl req -x509 -nodes -days 365 \
    -newkey rsa:2048 \
    -keyout /etc/ssl/private/selfsigned.key \
    -out /etc/ssl/certs/selfsigned.crt \
    -subj "/C=US/ST=State/L=City/O=Organization/OU=Unit/CN=54.221.158.5"

# Copy the HTML and JS files to the Nginx HTML directory
COPY . /usr/share/nginx/html

# Expose port for Nginx (HTTPS only)
EXPOSE 443

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Command to keep the container running
CMD ["nginx", "-g", "daemon off;"]

