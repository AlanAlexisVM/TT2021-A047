CREATE TABLE Unidad
(
  Clave VARCHAR(20) NOT NULL,
  Nombre VARCHAR(60) NOT NULL,
  Direccion VARCHAR(100) NOT NULL,
  Telefono VARCHAR(10) NOT NULL,
  CorreoE VARCHAR(50) NOT NULL,
  Especialidades VARCHAR(35) NOT NULL,
  Titular VARCHAR(50) NOT NULL,
  PRIMARY KEY (Clave)
);

CREATE TABLE Administrador
(
  IdAdmin INT NOT NULL AUTO_INCREMENT,
  Nombre VARCHAR(20) NOT NULL,
  Apellidos VARCHAR(30) NOT NULL,
  CorreoE VARCHAR(50) NULL,
  Contraseña VARCHAR(255) NOT NULL,
  PRIMARY KEY (IdAdmin)
);

CREATE TABLE Doc-CheckerH
(
  IdDCH INT NOT NULL AUTO_INCREMENT,
  Clave VARCHAR(20) NOT NULL,
  IdAdmin INT NOT NULL,
  PRIMARY KEY (IdDCH),
  FOREIGN KEY (Clave) REFERENCES Unidad(Clave),
  FOREIGN KEY (IdAdmin) REFERENCES Administrador(IdAdmin)
);

CREATE TABLE Locacion
(
  IdLoc INT NOT NULL AUTO_INCREMENT,
  ContaminacionAire INT NOT NULL,
  ContaminacionAgua INT NOT NULL,
  CalidadDeVida FLOAT NOT NULL,
  Felicidad FLOAT NOT NULL,
  Bienestar INT NOT NULL,
  ContaminacionAuditiva INT NOT NULL,
  Temperatura FLOAT NOT NULL,
  EsperanzaDeVida INT NOT NULL,
  Humedad INT NOT NULL,
  PRIMARY KEY (IdLoc)
);

CREATE TABLE SignosVitales
(
  IdSi INT NOT NULL,
  PRIMARY KEY (IdSi)
);

CREATE TABLE SignosVitales_Temperatura
(
  Temperatura FLOAT NOT NULL,
  IdSi INT NOT NULL,
  PRIMARY KEY (Temperatura, IdSi),
  FOREIGN KEY (IdSi) REFERENCES SignosVitales(IdSi)
);

CREATE TABLE SignosVitales_Oxigenación
(
  Oxigenación INT NOT NULL,
  IdSi INT NOT NULL,
  PRIMARY KEY (Oxigenación, IdSi),
  FOREIGN KEY (IdSi) REFERENCES SignosVitales(IdSi)
);

CREATE TABLE SignosVitales_FrecuenciaCardiaca
(
  FrecuenciaCardiaca INT NOT NULL,
  IdSi INT NOT NULL,
  PRIMARY KEY (FrecuenciaCardiaca, IdSi),
  FOREIGN KEY (IdSi) REFERENCES SignosVitales(IdSi)
);

CREATE TABLE Doctor
(
  CedulaProf INT NOT NULL,
  Nombre VARCHAR(20) NOT NULL,
  Apellidos VARCHAR(30) NOT NULL,
  CorreoE VARCHAR(20) NOT NULL,
  Contraseña VARCHAR(255) NOT NULL,
  Sexo VARCHAR(10) NOT NULL,
  FechaNac INT NOT NULL,
  Especialidad VARCHAR(20) NOT NULL,
  Direccion VARCHAR(20) NOT NULL,
  Telefono VARCHAR(10) NOT NULL,
  IdAdmin INT NOT NULL,
  PRIMARY KEY (CedulaProf),
  FOREIGN KEY (IdAdmin) REFERENCES Administrador(IdAdmin)
);

CREATE TABLE Paciente
(
  Nombre VARCHAR(20) NOT NULL,
  Apellidos VARCHAR(20) NOT NULL,
  IdPac INT NOT NULL,
  FechaNac INT NOT NULL,
  Sexo VARCHAR(10) NOT NULL,
  Telefono1 VARCHAR(10) NOT NULL,
  Telefono2 VARCHAR(10) NOT NULL,
  CorreoE VARCHAR(20) NOT NULL,
  Direccion VARCHAR(20) NOT NULL,
  IdLoc INT NOT NULL,
  IdDCH INT NOT NULL,
  IdSi INT NOT NULL,
  PRIMARY KEY (IdPac),
  FOREIGN KEY (IdLoc) REFERENCES Locacion(IdLoc),
  FOREIGN KEY (IdDCH) REFERENCES Doc-CheckerH(IdDCH),
  FOREIGN KEY (IdSi) REFERENCES SignosVitales(IdSi)
);

CREATE TABLE InformePaciente
(
  ExposicionSolar INT NOT NULL,
  VariacionesdeTemperatura INT NOT NULL,
  VariacionesdeHumedad INT NOT NULL,
  ExposicionRuido INT NOT NULL,
  IdInforme INT NOT NULL,
  ActividadFisica INT NOT NULL,
  Educacion INT NOT NULL,
  HorasDeSuenio INT NOT NULL,
  EstadoCivil VARCHAR(10) NOT NULL,
  PersonasDependientes INT NOT NULL,
  ConsumoDeFarmacos INT NOT NULL,
  IdPac INT,
  PRIMARY KEY (IdInforme),
  FOREIGN KEY (IdPac) REFERENCES Paciente(IdPac)
);

CREATE TABLE Tiene
(
  CedulaProf INT NOT NULL,
  Clave INT NOT NULL,
  PRIMARY KEY (CedulaProf, Clave),
  FOREIGN KEY (CedulaProf) REFERENCES Doctor(CedulaProf),
  FOREIGN KEY (Clave) REFERENCES Unidad(Clave)
);

CREATE TABLE Atiende
(
  CedulaProf INT NOT NULL,
  IdPac INT NOT NULL,
  PRIMARY KEY (CedulaProf, IdPac),
  FOREIGN KEY (CedulaProf) REFERENCES Doctor(CedulaProf),
  FOREIGN KEY (IdPac) REFERENCES Paciente(IdPac)
);

CREATE TABLE InformePaciente_AntecedentesFam
(
  AntecedentesFam INT NOT NULL,
  IdInforme INT NOT NULL,
  PRIMARY KEY (AntecedentesFam, IdInforme),
  FOREIGN KEY (IdInforme) REFERENCES InformePaciente(IdInforme)
);

CREATE TABLE InformePaciente_Padecimientos
(
  Padecimientos INT NOT NULL,
  IdInforme INT NOT NULL,
  PRIMARY KEY (Padecimientos, IdInforme),
  FOREIGN KEY (IdInforme) REFERENCES InformePaciente(IdInforme)
);

CREATE TABLE InformePaciente_Trabajo
(
  Trabajo INT NOT NULL,
  IdInforme INT NOT NULL,
  PRIMARY KEY (Trabajo, IdInforme),
  FOREIGN KEY (IdInforme) REFERENCES InformePaciente(IdInforme)
);

CREATE TABLE InformePaciente_Adicciones
(
  Adicciones INT NOT NULL,
  IdInforme INT NOT NULL,
  PRIMARY KEY (Adicciones, IdInforme),
  FOREIGN KEY (IdInforme) REFERENCES InformePaciente(IdInforme)
);