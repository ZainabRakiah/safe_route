import pandas as pd

df = pd.read_csv("safewalk.csv")
df = df.drop_duplicates()
'''
print(df.head())
print(df.info())
print(df.describe())

df = df.drop_duplicates()
df['column_name'].fillna(df['column_name'].mean(), inplace=True)

print(df.isnull().sum())'''