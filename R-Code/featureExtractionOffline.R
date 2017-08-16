data <- read.csv("C:/Users/Regular/Downloads/vatsal test.csv")

#Mean
#Median
#Average Resultant Acceleration
for (i in 1:nrow(data)) {
  meanData <- mean(data$Sensor1[i]+data$Sensor2[i]+data$Sensor3[i])
  medianData <- median(data$Sensor1[i]+data$Sensor2[i]+data$Sensor3[i])
  data$meanArr[i] <- meanData
  #data$medianArr[i] <- medianData
  araCalc <- (data$Sensor1[i]*data$Sensor1[i]) + (data$Sensor2[i] * data$Sensor2[i]) + (data$Sensor3[i] * data$Sensor3[i])
  data$ara[i] <- sqrt(araCalc)
  
}

## STANDARD DEVIATION
#data$sdx <- sd(data$Sensor1)

name <- c("Values", "Sensor1")
name <- as.list(name)
feat <- matrix(data$Sensor1, nrow(data), 1, 0)
colnames(feat)  <- c("Sensor1")
head(feat)

sd(feat)

data$Sensor1
#data <- cbind(data,data$meanArr,data$medianArr)
head(data)

#Add sd to last row
data[nrow(data)+1,1] <- sd(data$Sensor1)
