from main.controllers import *


def load_routes(app):
    app.add_url_rule('/api/v1/auth/login', view_func=AuthController.login, provide_automatic_options=True, methods=['OPTIONS', 'POST'])
    
    app.add_url_rule('/api/v1/clients', view_func=ClientController.client_index, provide_automatic_options=True, methods=['OPTIONS', 'GET'])
    app.add_url_rule('/api/v1/clients', view_func=ClientController.client_create, provide_automatic_options=True, methods=['OPTIONS', 'POST'])
    app.add_url_rule('/api/v1/clients/<int:client_id>', view_func=ClientController.client_get, provide_automatic_options=True, methods=['OPTIONS', 'GET'])
    app.add_url_rule('/api/v1/clients/<int:client_id>', view_func=ClientController.client_update, provide_automatic_options=True, methods=['OPTIONS', 'PATCH'])
    app.add_url_rule('/api/v1/clients/<int:client_id>', view_func=ClientController.client_delete, provide_automatic_options=True, methods=['OPTIONS', 'DELETE'])

    app.add_url_rule('/api/v1/clients/<int:client_id>/sockets', view_func=SocketController.socket_index, provide_automatic_options=True, methods=['OPTIONS', 'GET'])
    app.add_url_rule('/api/v1/clients/<int:client_id>/sockets', view_func=SocketController.socket_create, provide_automatic_options=True, methods=['OPTIONS', 'POST'])
    app.add_url_rule('/api/v1/clients/<int:client_id>/sockets/<int:socket_id>', view_func=SocketController.socket_get, provide_automatic_options=True, methods=['OPTIONS', 'GET'])
    app.add_url_rule('/api/v1/clients/<int:client_id>/sockets/<int:socket_id>', view_func=SocketController.socket_update, provide_automatic_options=True, methods=['OPTIONS', 'PATCH'])
    app.add_url_rule('/api/v1/clients/<int:client_id>/sockets/<int:socket_id>', view_func=SocketController.socket_delete, provide_automatic_options=True, methods=['OPTIONS', 'DELETE'])

    app.add_url_rule('/api/v1/sockets/<int:socket_id>/gauges', view_func=GaugeController.gauge_index, provide_automatic_options=True, methods=['OPTIONS', 'GET'])
    app.add_url_rule('/api/v1/sockets/<int:socket_id>/gauges', view_func=GaugeController.gauge_create, provide_automatic_options=True, methods=['OPTIONS', 'POST'])
    app.add_url_rule('/api/v1/sockets/<int:socket_id>/gauges/<int:gauge_id>', view_func=GaugeController.gauge_get, provide_automatic_options=True, methods=['OPTIONS', 'GET'])
    app.add_url_rule('/api/v1/sockets/<int:socket_id>/gauges/<int:gauge_id>', view_func=GaugeController.gauge_update, provide_automatic_options=True, methods=['OPTIONS', 'PATCH'])
    app.add_url_rule('/api/v1/sockets/<int:socket_id>/gauges/<int:gauge_id>', view_func=GaugeController.gauge_delete, provide_automatic_options=True, methods=['OPTIONS', 'DELETE'])