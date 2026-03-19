"use client"

import { useCallback, useState } from "react"
import Link from "next/link"
import { Search, Filter, Plus, X } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { string } from "zod"
import { useFilterConsult } from "@/hooks/filterConsult"

const reasonOptions = [
  { value: "all", label: "All Reasons" },
  { value: "checkup", label: "Routine Checkup" },
  { value: "pain", label: "Tooth Pain" },
  { value: "cleaning", label: "Teeth Cleaning" },
  { value: "filling", label: "Filling" },
  { value: "extraction", label: "Extraction" },
  { value: "root-canal", label: "Root Canal" },
  { value: "crown", label: "Crown/Bridge" },
  { value: "whitening", label: "Whitening" },
  { value: "other", label: "Other" },
]

export function ConsultationFilters() {
  const [searchName, setSearchName] = useState("")
  const [searchDni, setSearchDni] = useState("")
  const [selectedReason, setSelectedReason] = useState("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const {filterValues} = useFilterConsult()

  const activeFiltersCount = [
    searchName,
    searchDni,
    selectedReason !== "all" ? selectedReason : "",
    dateFrom,
    dateTo,
  ].filter(Boolean).length


  const handleValueFilter =(searchDni: string)=>{
    const filters: string[] = []

    if(searchDni) filters.push(searchDni)
      filterValues(filters)
  }


  const clearFilters = () => {
    setSearchName("")
    setSearchDni("")
    setSelectedReason("all")
    setDateFrom("")
    setDateTo("")
    filterValues(null)
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar paciente por dni..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Button  
              variant="outline" 
              className="sm:w-auto" 
              onClick={()=>handleValueFilter(searchName)}>
              Buscar
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="sm:w-auto"
            >
              <Filter className="size-4 mr-2" />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2 size-5 rounded-full p-0 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>


            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="size-4 mr-1" />
                Limpiar Filtros
              </Button>
            )}
          </div>
          
        </div>

        {showFilters && (
          <div className="mt-4 grid gap-4 border-t pt-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">DNI</label>
              <Input
                placeholder="Search by DNI..."
                value={searchDni}
                onChange={(e) => setSearchDni(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Motivos</label>
              <Select value={selectedReason} onValueChange={setSelectedReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  {reasonOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Desde</label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Hasta</label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
