import {AreaChart, Area, ResponsiveContainer} from "recharts"

type Props = {
   data: any;
}

const AreaChartComponent = ({data}: Props) => {
  console.log({data})
  return (
    <ResponsiveContainer width="100%" height="100%" >
      <AreaChart width={500} height={400} data={data}>
          <Area 
              type="monotone" 
              dataKey="amount"        
          />
          <Area 
              type="monotone" 
              dataKey="type"        
          />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default AreaChartComponent;
