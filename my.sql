USE [master]
GO
/****** Object:  Database [KoiVeterinaryServiceCenter]    Script Date: 10/31/2024 1:34:56 PM ******/
CREATE DATABASE [KoiVeterinaryServiceCenter]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'KoiVeterinaryServiceCenter', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\KoiVeterinaryServiceCenter.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'KoiVeterinaryServiceCenter_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\KoiVeterinaryServiceCenter_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [KoiVeterinaryServiceCenter].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET ARITHABORT OFF 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET  ENABLE_BROKER 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET RECOVERY FULL 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET  MULTI_USER 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET DB_CHAINING OFF 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'KoiVeterinaryServiceCenter', N'ON'
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET QUERY_STORE = ON
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [KoiVeterinaryServiceCenter]
GO
USE [KoiVeterinaryServiceCenter]
GO
/****** Object:  Sequence [dbo].[feid]    Script Date: 10/31/2024 1:34:56 PM ******/
CREATE SEQUENCE [dbo].[feid] 
 AS [bigint]
 START WITH 1
 INCREMENT BY 1
 MINVALUE -9223372036854775808
 MAXVALUE 9223372036854775807
 CACHE 
GO
USE [KoiVeterinaryServiceCenter]
GO
/****** Object:  Sequence [dbo].[fishid]    Script Date: 10/31/2024 1:34:56 PM ******/
CREATE SEQUENCE [dbo].[fishid] 
 AS [bigint]
 START WITH 1
 INCREMENT BY 1
 MINVALUE -9223372036854775808
 MAXVALUE 9223372036854775807
 CACHE 
GO
USE [KoiVeterinaryServiceCenter]
GO
/****** Object:  Sequence [dbo].[invoiceid]    Script Date: 10/31/2024 1:34:56 PM ******/
CREATE SEQUENCE [dbo].[invoiceid] 
 AS [bigint]
 START WITH 1
 INCREMENT BY 1
 MINVALUE -9223372036854775808
 MAXVALUE 9223372036854775807
 CACHE 
GO
USE [KoiVeterinaryServiceCenter]
GO
/****** Object:  Sequence [dbo].[orderid]    Script Date: 10/31/2024 1:34:56 PM ******/
CREATE SEQUENCE [dbo].[orderid] 
 AS [bigint]
 START WITH 1
 INCREMENT BY 1
 MINVALUE -9223372036854775808
 MAXVALUE 9223372036854775807
 CACHE 
GO
USE [KoiVeterinaryServiceCenter]
GO
/****** Object:  Sequence [dbo].[seid]    Script Date: 10/31/2024 1:34:56 PM ******/
CREATE SEQUENCE [dbo].[seid] 
 AS [bigint]
 START WITH 1
 INCREMENT BY 1
 MINVALUE -9223372036854775808
 MAXVALUE 9223372036854775807
 CACHE 
GO
USE [KoiVeterinaryServiceCenter]
GO
/****** Object:  Sequence [dbo].[vetid]    Script Date: 10/31/2024 1:34:56 PM ******/
CREATE SEQUENCE [dbo].[vetid] 
 AS [bigint]
 START WITH 1
 INCREMENT BY 1
 MINVALUE -9223372036854775808
 MAXVALUE 9223372036854775807
 CACHE 
GO
/****** Object:  Table [dbo].[feedbacks]    Script Date: 10/31/2024 1:34:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[feedbacks](
	[feedback_id] [varchar](255) NOT NULL,
	[comment] [varchar](255) NULL,
	[feedback_date_time] [datetime2](6) NULL,
	[rating] [real] NULL,
	[orderid] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[feedback_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[fish]    Script Date: 10/31/2024 1:34:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[fish](
	[fishid] [varchar](255) NOT NULL,
	[userid] [varchar](255) NOT NULL,
	[describe] [varchar](255) NULL,
	[length] [real] NULL,
	[month] [int] NOT NULL,
	[weight] [real] NULL,
PRIMARY KEY CLUSTERED 
(
	[fishid] ASC,
	[userid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[invoice]    Script Date: 10/31/2024 1:34:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[invoice](
	[invoiceid] [varchar](255) NOT NULL,
	[inv_date] [datetime2](6) NULL,
	[method] [varchar](255) NULL,
	[total] [int] NOT NULL,
	[orderid] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[invoiceid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[order_details]    Script Date: 10/31/2024 1:34:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order_details](
	[orderid] [varchar](255) NOT NULL,
	[serviceid] [varchar](255) NOT NULL,
	[quantity] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[orderid] ASC,
	[serviceid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[orders]    Script Date: 10/31/2024 1:34:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[orders](
	[orderid] [varchar](255) NOT NULL,
	[address] [nvarchar](255) NOT NULL,
	[description] [nvarchar](255) NULL,
	[order_date] [date] NULL,
	[status] [varchar](255) NULL,
	[slot] [int] NOT NULL,
	[expenseid] [varchar](255) NOT NULL,
	[userid] [varchar](255) NOT NULL,
	[veterinarianid] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[orderid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[roles]    Script Date: 10/31/2024 1:34:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[roles](
	[roleid] [varchar](255) NOT NULL,
	[title] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[roleid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[services]    Script Date: 10/31/2024 1:34:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[services](
	[serviceid] [varchar](255) NOT NULL,
	[is_service] [bit] NOT NULL,
	[max_quantity] [int] NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[price] [real] NULL,
	[type] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[serviceid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[slots]    Script Date: 10/31/2024 1:34:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[slots](
	[slot] [int] NOT NULL,
	[end_time] [time](7) NULL,
	[start_time] [time](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[slot] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[travel_expenses]    Script Date: 10/31/2024 1:34:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[travel_expenses](
	[expenseid] [varchar](255) NOT NULL,
	[fee] [int] NOT NULL,
	[end_location] [nvarchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[expenseid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 10/31/2024 1:34:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[userid] [varchar](255) NOT NULL,
	[address] [nvarchar](255) NULL,
	[email] [varchar](255) NULL,
	[name] [nvarchar](255) NULL,
	[password] [varchar](255) NOT NULL,
	[phone_number] [varchar](255) NOT NULL,
	[roleid] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[userid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[veterinarians]    Script Date: 10/31/2024 1:34:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[veterinarians](
	[veterinarianid] [varchar](255) NOT NULL,
	[description] [nvarchar](255) NOT NULL,
	[status] [bit] NOT NULL,
	[userid] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[veterinarianid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[invoice] ([invoiceid], [inv_date], [method], [total], [orderid]) VALUES (N'I22', CAST(N'2024-10-31T13:13:59.0869480' AS DateTime2), N'cash', 1300000, N'O24')
GO
INSERT [dbo].[orders] ([orderid], [address], [description], [order_date], [status], [slot], [expenseid], [userid], [veterinarianid]) VALUES (N'O24', N'Quận 1', NULL, CAST(N'2024-10-31' AS Date), N'done', 2, N'E1', N'customer', N'V002')
GO
INSERT [dbo].[roles] ([roleid], [title]) VALUES (N'C', N'Customer')
INSERT [dbo].[roles] ([roleid], [title]) VALUES (N'M', N'Manager')
INSERT [dbo].[roles] ([roleid], [title]) VALUES (N'S', N'Staff')
INSERT [dbo].[roles] ([roleid], [title]) VALUES (N'V', N'Veterina')
GO
INSERT [dbo].[services] ([serviceid], [is_service], [max_quantity], [name], [price], [type]) VALUES (N'S001', 1, 1, N'Kiểm tra sức khỏe cá Koi', 700000, N'Điều trị')
INSERT [dbo].[services] ([serviceid], [is_service], [max_quantity], [name], [price], [type]) VALUES (N'S002', 1, 1, N'Chăm sóc lông vây', 1050000, N'Chăm sóc')
INSERT [dbo].[services] ([serviceid], [is_service], [max_quantity], [name], [price], [type]) VALUES (N'S003', 1, 1, N'Điều trị bệnh ký sinh trùng', 1400000, N'Điều trị')
INSERT [dbo].[services] ([serviceid], [is_service], [max_quantity], [name], [price], [type]) VALUES (N'S004', 1, 1, N'Điều trị bệnh nấm', 1200000, N'Điều trị')
INSERT [dbo].[services] ([serviceid], [is_service], [max_quantity], [name], [price], [type]) VALUES (N'S005', 1, 1, N'Thiết lập hồ cá', 3500000, N'Thiết lập hồ')
INSERT [dbo].[services] ([serviceid], [is_service], [max_quantity], [name], [price], [type]) VALUES (N'S006', 1, 1, N'Thiết kế hồ cá Koi', 1.2E+07, N'Thiết lập hồ')
INSERT [dbo].[services] ([serviceid], [is_service], [max_quantity], [name], [price], [type]) VALUES (N'S007', 1, 1, N'Thay nước và làm sạch hồ', 2300000, N'Thiết lập hồ')
INSERT [dbo].[services] ([serviceid], [is_service], [max_quantity], [name], [price], [type]) VALUES (N'S008', 1, 1, N'Tư vấn dinh dưỡng cho cá Koi', 580000, N'Tư vấn')
INSERT [dbo].[services] ([serviceid], [is_service], [max_quantity], [name], [price], [type]) VALUES (N'S009', 0, 100, N'Thuốc trị kí sinh Paracide Z18', 550000, N'Thuốc')
INSERT [dbo].[services] ([serviceid], [is_service], [max_quantity], [name], [price], [type]) VALUES (N'S010', 0, 100, N'Thuốc kích thích BUTAPHAN B12', 250000, N'Thuốc')
INSERT [dbo].[services] ([serviceid], [is_service], [max_quantity], [name], [price], [type]) VALUES (N'S011', 0, 100, N'Thuốc trị nấm AQUA BRONO', 200000, N'Thuốc')
INSERT [dbo].[services] ([serviceid], [is_service], [max_quantity], [name], [price], [type]) VALUES (N'S012', 0, 100, N'Bổ sung khoáng , ổn định PH AQUA-MINERWAY', 200000, N'Thuốc')
INSERT [dbo].[services] ([serviceid], [is_service], [max_quantity], [name], [price], [type]) VALUES (N'S013', 1, 1, N'Tư vấn chăm sóc tổng quát', 800000, N'Tư vấn')
GO
INSERT [dbo].[slots] ([slot], [end_time], [start_time]) VALUES (1, CAST(N'08:30:00' AS Time), CAST(N'07:00:00' AS Time))
INSERT [dbo].[slots] ([slot], [end_time], [start_time]) VALUES (2, CAST(N'10:00:00' AS Time), CAST(N'08:30:00' AS Time))
INSERT [dbo].[slots] ([slot], [end_time], [start_time]) VALUES (3, CAST(N'11:30:00' AS Time), CAST(N'10:00:00' AS Time))
INSERT [dbo].[slots] ([slot], [end_time], [start_time]) VALUES (4, CAST(N'14:30:00' AS Time), CAST(N'13:00:00' AS Time))
INSERT [dbo].[slots] ([slot], [end_time], [start_time]) VALUES (5, CAST(N'16:00:00' AS Time), CAST(N'14:30:00' AS Time))
INSERT [dbo].[slots] ([slot], [end_time], [start_time]) VALUES (6, CAST(N'17:30:00' AS Time), CAST(N'16:00:00' AS Time))
GO
INSERT [dbo].[travel_expenses] ([expenseid], [fee], [end_location]) VALUES (N'E0', 0, N'Online')
INSERT [dbo].[travel_expenses] ([expenseid], [fee], [end_location]) VALUES (N'E1', 250000, N'Quận 1')
INSERT [dbo].[travel_expenses] ([expenseid], [fee], [end_location]) VALUES (N'E10', 295000, N'Quận 10')
INSERT [dbo].[travel_expenses] ([expenseid], [fee], [end_location]) VALUES (N'E11', 310000, N'Quận 11')
INSERT [dbo].[travel_expenses] ([expenseid], [fee], [end_location]) VALUES (N'E12', 235000, N'Quận 12')
INSERT [dbo].[travel_expenses] ([expenseid], [fee], [end_location]) VALUES (N'E2', 175000, N'Quận 2')
INSERT [dbo].[travel_expenses] ([expenseid], [fee], [end_location]) VALUES (N'E3', 280000, N'Quận 3')
INSERT [dbo].[travel_expenses] ([expenseid], [fee], [end_location]) VALUES (N'E4', 310000, N'Quận 4')
INSERT [dbo].[travel_expenses] ([expenseid], [fee], [end_location]) VALUES (N'E5', 325000, N'Quận 5')
INSERT [dbo].[travel_expenses] ([expenseid], [fee], [end_location]) VALUES (N'E6', 355000, N'Quận 6')
INSERT [dbo].[travel_expenses] ([expenseid], [fee], [end_location]) VALUES (N'E7', 280000, N'Quận 7')
INSERT [dbo].[travel_expenses] ([expenseid], [fee], [end_location]) VALUES (N'E8', 340000, N'Quận 8')
INSERT [dbo].[travel_expenses] ([expenseid], [fee], [end_location]) VALUES (N'E9', 0, N'Quận 9')
INSERT [dbo].[travel_expenses] ([expenseid], [fee], [end_location]) VALUES (N'EBc', 400000, N'Huyện Bình Chánh')
INSERT [dbo].[travel_expenses] ([expenseid], [fee], [end_location]) VALUES (N'Ebt', 340000, N'Quận Bình Tân')
INSERT [dbo].[travel_expenses] ([expenseid], [fee], [end_location]) VALUES (N'Ebth', 265000, N'Quận Bình Thạnh')
INSERT [dbo].[travel_expenses] ([expenseid], [fee], [end_location]) VALUES (N'ECc', 475000, N'Huyện Củ Chi')
INSERT [dbo].[travel_expenses] ([expenseid], [fee], [end_location]) VALUES (N'ECg', 775000, N'Huyện Cần Giờ')
INSERT [dbo].[travel_expenses] ([expenseid], [fee], [end_location]) VALUES (N'EGv', 280000, N'Quận Gò Vấp')
INSERT [dbo].[travel_expenses] ([expenseid], [fee], [end_location]) VALUES (N'EHm', 355000, N'Huyện Hóc Môn')
INSERT [dbo].[travel_expenses] ([expenseid], [fee], [end_location]) VALUES (N'ENb', 400000, N'Huyện Nhà Bè')
INSERT [dbo].[travel_expenses] ([expenseid], [fee], [end_location]) VALUES (N'EPn', 250000, N'Quận Phú Nhuận')
INSERT [dbo].[travel_expenses] ([expenseid], [fee], [end_location]) VALUES (N'ETb', 295000, N'Quận Tân Bình')
INSERT [dbo].[travel_expenses] ([expenseid], [fee], [end_location]) VALUES (N'ETp', 325000, N'Quận Tân Phú')
GO
INSERT [dbo].[users] ([userid], [address], [email], [name], [password], [phone_number], [roleid]) VALUES (N'admin', NULL, N'admin@gmail.com', N'admin', N'$2a$10$/yBBYrfd20F8ow6tceFnGO2GDcplDDAFUJ1OOe3eizQfWu9hBem8.', N'0123456789', N'M')
INSERT [dbo].[users] ([userid], [address], [email], [name], [password], [phone_number], [roleid]) VALUES (N'adminVuNdh1551@fpt', N'*', N'vundhse181551@fpt.edu.vn', N'Vũ', N'$2b$12$sc1VlYcsSsV.OAjfRK8wPOuU.Kms4VN/h63sL3JrPiJ3ZU.qcGj8.', N'782676284', N'M')
INSERT [dbo].[users] ([userid], [address], [email], [name], [password], [phone_number], [roleid]) VALUES (N'anHq896^1', N'Quận 3, TP.HCM', N'anhq7826@gmail.com', N'Bác sĩ Hoàng Quốc An', N'$2b$12$JP4AXPeXO6hpfnRU9QNn3.WdDSO0Clu6DifAmaBSyC6FyksuOGrcy', N'738926762', N'V')
INSERT [dbo].[users] ([userid], [address], [email], [name], [password], [phone_number], [roleid]) VALUES (N'customer', NULL, N'customer@gmail.com', N'customer', N'$2a$10$yX5yg.SMJuiEoVxWAv7ZiussVpq6CaX5kQQY7/xL2fIkeH8j54MQa', N'0123456789', N'C')
INSERT [dbo].[users] ([userid], [address], [email], [name], [password], [phone_number], [roleid]) VALUES (N'duynqw773%', N'Quận 5, TP.HCM', N'huypttt7832@gmail.com', N'Bác sĩ Phan Trọng Duy', N'$2b$12$lOamUB4kKr51Hhd3z.Xa9enswImnn9AcgU/bz7iMSN/v6gwv6ywzG', N'367482542', N'V')
INSERT [dbo].[users] ([userid], [address], [email], [name], [password], [phone_number], [roleid]) VALUES (N'hungnv993@nvVet', N'Quận 9, TP.HCM', N'hungnv993@gmail.com', N'Bác sĩ Nguyễn Văn Hùng', N'$2b$12$zc8iJverZmPObaQ5DMXEoOI841v3OT.mGMt/CJHVKCpwUjORYyUIK', N'341256789', N'V')
INSERT [dbo].[users] ([userid], [address], [email], [name], [password], [phone_number], [roleid]) VALUES (N'huyNQse1815@890', N'Quận 2, TP.HCM', N'huynq6782@gmail.com', N'Bác sĩ Nguyễn Quang Huy', N'$2b$12$eUOzGJMGBJ6Hc/bR77HR3e4e0SOnB86xlGUkOj3j/C1W.MzLo9Lde', N'741268326', N'V')
INSERT [dbo].[users] ([userid], [address], [email], [name], [password], [phone_number], [roleid]) VALUES (N'khanhlt654@vet', N'Quận Phú Nhuận, TP.HCM', N'khanhlt654@gmail.com', N'Bác sĩ Lê Thị Khánh', N'$2b$12$io.UqSzB8o5nfNbodSqP6eg7Md8yt50ordreLOGkBiWCKmhH.ZkSi', N'975134872', N'V')
INSERT [dbo].[users] ([userid], [address], [email], [name], [password], [phone_number], [roleid]) VALUES (N'minhthao875@vet', N'Quận 10, TP.HCM', N'minhthao875@gmail.com', N'Bác sĩ Lê Minh Thảo', N'$2b$12$aG/HHnefxjrHcnDbpdcrlOgepr0wH0p.zBsTod355.UMLW0rmgdFC', N'935123467', N'V')
INSERT [dbo].[users] ([userid], [address], [email], [name], [password], [phone_number], [roleid]) VALUES (N'sNmphuongHCM', N'*', N'phuongnm7234@gmail.com', N'Nguyễn Minh Phương', N'$2b$12$R.4WveSm1VdVXWDeQJ.PJOS.Bkk/WQ/fAIz1sQ/M8mtaA2iEDWX/y', N'123456789', N'S')
INSERT [dbo].[users] ([userid], [address], [email], [name], [password], [phone_number], [roleid]) VALUES (N'staff', NULL, N'staff@gmail.com', N'staff', N'$2a$10$v7.FMw9Y9Vmjwf6E4usWFOucG5sAfALnWM3/Y92bgJBbWljITAaAW', N'0123456789', N'S')
INSERT [dbo].[users] ([userid], [address], [email], [name], [password], [phone_number], [roleid]) VALUES (N'trangtttSe1832@893', N'Quận 1, TP.HCM', N'trangttt9242@gmail.com', N'Bác sĩ Trần Thị Thanh Trang', N'$2b$12$y843OgKWFfrSNMc8RiIxL.zlBqSQNqSJOii.T78VBFJpLPBC4q7Sy', N'673926472', N'V')
INSERT [dbo].[users] ([userid], [address], [email], [name], [password], [phone_number], [roleid]) VALUES (N'trunghc900%', N'Quận 7, TP.HCM', N'trunghcse18632@gmail.com', N'Bác sĩ Hoàng Chí Trung', N'$2b$12$7hB3uGZeILJsarirkwInQOGNPrlIMxumofIkEO4mffucmkGWai9HW', N'356478261', N'V')
INSERT [dbo].[users] ([userid], [address], [email], [name], [password], [phone_number], [roleid]) VALUES (N'vHmVinh040@nmPhv', N'Quận Thủ Đức, TP.HCM', N'vinhHM4805@gmail.com', N'Bác sĩ Hoàng Minh Vinh', N'$2b$12$Zbj0yebCbF.PEDA80/DNd.zh/PkS6r5yC8eDCk2S0lrlm//EoD/vm', N'354927521', N'V')
GO
INSERT [dbo].[veterinarians] ([veterinarianid], [description], [status], [userid]) VALUES (N'V001', N'Kinh nghiệm: 5 năm điều trị thú cưng. Học vấn: Đại học Nông Lâm TP.HCM. Chứng chỉ: Thú y cấp 3.', 1, N'vHmVinh040@nmPhv')
INSERT [dbo].[veterinarians] ([veterinarianid], [description], [status], [userid]) VALUES (N'V002', N'Kinh nghiệm: 3 năm tại phòng khám thú y quốc tế. Học vấn: Đại học Cần Thơ. Chứng chỉ: Chăm sóc thú cưng chuyên sâu.', 1, N'trangtttSe1832@893')
INSERT [dbo].[veterinarians] ([veterinarianid], [description], [status], [userid]) VALUES (N'V003', N'Kinh nghiệm: 2 năm trợ lý thú y. Học vấn: Đại học Nông nghiệp Hà Nội. Chứng chỉ: Sơ cấp thú y.', 1, N'huyNQse1815@890')
INSERT [dbo].[veterinarians] ([veterinarianid], [description], [status], [userid]) VALUES (N'V004', N'Kinh nghiệm: 6 năm tại bệnh viện thú y lớn. Học vấn: Thạc sĩ Thú y. Chứng chỉ: Phẫu thuật thú y nâng cao.', 1, N'anHq896^1')
INSERT [dbo].[veterinarians] ([veterinarianid], [description], [status], [userid]) VALUES (N'V005', N'Kinh nghiệm: 1 năm thực tập tại trung tâm cứu hộ động vật. Học vấn: Trung cấp Thú y. Chứng chỉ: Hỗ trợ thú y cơ bản.', 1, N'duynqw773%')
INSERT [dbo].[veterinarians] ([veterinarianid], [description], [status], [userid]) VALUES (N'V006', N'Kinh nghiệm: Đang là sinh viên năm cuối ngành Thú y. Học vấn: Đại học Thú y TP.HCM. Chứng chỉ: Đang hoàn thành chương trình học.', 0, N'trunghc900%')
INSERT [dbo].[veterinarians] ([veterinarianid], [description], [status], [userid]) VALUES (N'V007', N'Kinh nghiệm: 4 năm chăm sóc và điều trị động vật hoang dã. Học vấn: Đại học Thú y Đà Lạt. Chứng chỉ: Phòng chống bệnh dịch cho động vật.', 1, N'hungnv993@nvVet')
INSERT [dbo].[veterinarians] ([veterinarianid], [description], [status], [userid]) VALUES (N'V008', N'Kinh nghiệm: 3 năm điều trị thú nhỏ. Học vấn: Đại học Nông Lâm TP.HCM. Chứng chỉ: Kiểm soát sức khỏe thú nhỏ chuyên sâu.', 1, N'minhthao875@vet')
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UKggyh0cuf7eh4u0y47eg9lpvrr]    Script Date: 10/31/2024 1:34:56 PM ******/
ALTER TABLE [dbo].[feedbacks] ADD  CONSTRAINT [UKggyh0cuf7eh4u0y47eg9lpvrr] UNIQUE NONCLUSTERED 
(
	[orderid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UKcde6dly85qdehn04xgjf3te43]    Script Date: 10/31/2024 1:34:56 PM ******/
ALTER TABLE [dbo].[invoice] ADD  CONSTRAINT [UKcde6dly85qdehn04xgjf3te43] UNIQUE NONCLUSTERED 
(
	[orderid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UKnodjpaox51kclukt7yi0hf6qf]    Script Date: 10/31/2024 1:34:56 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [UKnodjpaox51kclukt7yi0hf6qf] ON [dbo].[roles]
(
	[title] ASC
)
WHERE ([title] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UKqknbunfghsa9rumkib8y353ox]    Script Date: 10/31/2024 1:34:56 PM ******/
ALTER TABLE [dbo].[veterinarians] ADD  CONSTRAINT [UKqknbunfghsa9rumkib8y353ox] UNIQUE NONCLUSTERED 
(
	[userid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[feedbacks]  WITH CHECK ADD  CONSTRAINT [FKt1m4e7xd855ddtfnlab8umicj] FOREIGN KEY([orderid])
REFERENCES [dbo].[orders] ([orderid])
GO
ALTER TABLE [dbo].[feedbacks] CHECK CONSTRAINT [FKt1m4e7xd855ddtfnlab8umicj]
GO
ALTER TABLE [dbo].[fish]  WITH CHECK ADD  CONSTRAINT [FKl7dfj6s81ruupplqtgb0ef3l5] FOREIGN KEY([userid])
REFERENCES [dbo].[users] ([userid])
GO
ALTER TABLE [dbo].[fish] CHECK CONSTRAINT [FKl7dfj6s81ruupplqtgb0ef3l5]
GO
ALTER TABLE [dbo].[invoice]  WITH CHECK ADD  CONSTRAINT [FKh5woett7bym1d45rjms12lcke] FOREIGN KEY([orderid])
REFERENCES [dbo].[orders] ([orderid])
GO
ALTER TABLE [dbo].[invoice] CHECK CONSTRAINT [FKh5woett7bym1d45rjms12lcke]
GO
ALTER TABLE [dbo].[order_details]  WITH CHECK ADD  CONSTRAINT [FK86hc96svkn8jqkxm34ig79tcr] FOREIGN KEY([serviceid])
REFERENCES [dbo].[services] ([serviceid])
GO
ALTER TABLE [dbo].[order_details] CHECK CONSTRAINT [FK86hc96svkn8jqkxm34ig79tcr]
GO
ALTER TABLE [dbo].[order_details]  WITH CHECK ADD  CONSTRAINT [FKh35b1ljeu4440iie9psw8a7yt] FOREIGN KEY([orderid])
REFERENCES [dbo].[orders] ([orderid])
GO
ALTER TABLE [dbo].[order_details] CHECK CONSTRAINT [FKh35b1ljeu4440iie9psw8a7yt]
GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD  CONSTRAINT [FK90495apas76xcxitsm5pt8exw] FOREIGN KEY([expenseid])
REFERENCES [dbo].[travel_expenses] ([expenseid])
GO
ALTER TABLE [dbo].[orders] CHECK CONSTRAINT [FK90495apas76xcxitsm5pt8exw]
GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD  CONSTRAINT [FKnugc1dfi5l3enwwbab6uraq3e] FOREIGN KEY([slot])
REFERENCES [dbo].[slots] ([slot])
GO
ALTER TABLE [dbo].[orders] CHECK CONSTRAINT [FKnugc1dfi5l3enwwbab6uraq3e]
GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD  CONSTRAINT [FKop4fhvylu0vtmoxp6vg5kb782] FOREIGN KEY([veterinarianid])
REFERENCES [dbo].[veterinarians] ([veterinarianid])
GO
ALTER TABLE [dbo].[orders] CHECK CONSTRAINT [FKop4fhvylu0vtmoxp6vg5kb782]
GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD  CONSTRAINT [FKpnm1eeupqm4tykds7k3okqegv] FOREIGN KEY([userid])
REFERENCES [dbo].[users] ([userid])
GO
ALTER TABLE [dbo].[orders] CHECK CONSTRAINT [FKpnm1eeupqm4tykds7k3okqegv]
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD  CONSTRAINT [FKgrhs0suhl8cbodxn47xadxp94] FOREIGN KEY([roleid])
REFERENCES [dbo].[roles] ([roleid])
GO
ALTER TABLE [dbo].[users] CHECK CONSTRAINT [FKgrhs0suhl8cbodxn47xadxp94]
GO
ALTER TABLE [dbo].[veterinarians]  WITH CHECK ADD  CONSTRAINT [FKi3mhro8qchn9mos1wht5wf04b] FOREIGN KEY([userid])
REFERENCES [dbo].[users] ([userid])
GO
ALTER TABLE [dbo].[veterinarians] CHECK CONSTRAINT [FKi3mhro8qchn9mos1wht5wf04b]
GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD CHECK  (([status]='done' OR [status]='cancel' OR [status]='accept' OR [status]='pending'))
GO
USE [master]
GO
ALTER DATABASE [KoiVeterinaryServiceCenter] SET  READ_WRITE 
GO
