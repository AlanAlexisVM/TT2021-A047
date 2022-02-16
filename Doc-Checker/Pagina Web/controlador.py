from bd import conexion

def insertar(name):
    conexion1  = conexion()
    with conexion1.cursor() as cursor:
        cursor.execute("INSERT INTO usuarios(name) VALUES(%s)", (name))
        conexion1.commit()
        conexion1.close()